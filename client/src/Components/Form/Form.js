import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import useStyles from "./style.js";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../Actions/postAction.js";

export default function Form({ currentId, setCurrentId }) {

    const [postData, setPostData] = useState({
        title: "", message: "", tags: "", selectedFile: ""
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    // const p =useSelector((state)= state.posts)
    const post = useSelector((state) => currentId ? state.postReducer.posts.find((p) => p._id === currentId) : null)
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    function handleSubmit(e) {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    }

    function clear() {
        setCurrentId(null);
        setPostData({ title: "", message: "", tags: "", selectedFile: "" });
    }

    const bgColor = {
        "Ruby": "#B22222"
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} style={{ backgroundColor: bgColor.Ruby }}>
                <Typography variant="h6" align="center" style={{ color: 'white' }}>
                    Please Sign In to create your post and like other's Post.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{!currentId ? "Creating" : "Updating"} a Memory</Typography>
                {/* <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                /> */}
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onSubmit={handleSubmit}>{!currentId ? "Submit" : "Update"}</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}