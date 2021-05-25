import React, { useState, useEffect } from 'react'
import { TextField , Button, Typography, Paper} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState ({
         title: '', message: '', location: '', selectedFile: '', tags: ''
    })
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);
    
    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', location: '', selectedFile: '', tags: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost({ ...postData, name: user?.result?.name }));
          clear();
        } else {
          dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
          clear();
        }
      };

      if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own private event .
            </Typography>
          </Paper>
        );
      }

    
    return(
        <Paper className="{classes.paper">
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Edit' : 'Create' } your Undrgrnd event</Typography>
                <TextField name="title"
                            variant="outlined"
                            label="Title" fullWidth
                            value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}></TextField> 
                <TextField name="message"
                            variant="outlined"
                            label="Message" fullWidth
                            multiline rows={4}
                            value={postData.message} 
                            onChange={(e) => setPostData({ ...postData, message: e.target.value })}></TextField>
                <TextField name="location"
                            variant="outlined"
                            label="Location/Date & Time" fullWidth
                            value={postData.location}
                            onChange={(e) => setPostData({ ...postData, location: e.target.value })}></TextField>
                 <TextField name="tags"
                            variant="outlined"
                            label="Tags" fullWidth
                            value={postData.tags}
                            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}></TextField>
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}>   
                    </FileBase>
                    <Button className={classes.buttonSubmit} 
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        type="submit" fullWidth>Submit
                    </Button>
                    <Button variant="contained" 
                        color="secondary" 
                        size="small" 
                        onClick={clear} fullWidth>Clear
                    </Button>
                </div>
            </form>
        </Paper>
    )
}

export default Form;