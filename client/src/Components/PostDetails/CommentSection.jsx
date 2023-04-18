import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { useState } from "react";
import { commentPost } from "../../Actions/postAction.js";

export default function CommentSection({ post }) {
    console.log(post);
    const classes = useStyles();
    const [comments, setComments] = useState([1, 2, 3, 4]);
    const [comment, setComment] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();

    function handleClick() {

        const finalComment = `${user.result.name}:${comment}`;
        dispatch(commentPost(finalComment, post._id))
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography gutterBottom variant="subtitle1" key={i}>
                            Comment {i}
                        </Typography>
                    ))}
                </div>
                <div style={{ width: "70%" }}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant="outlined"
                        label="Comment"
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment} variant="contained" onClick={handleClick} color="primary">
                        Comment
                    </Button>
                </div>
            </div>
        </div>
    );
} 
