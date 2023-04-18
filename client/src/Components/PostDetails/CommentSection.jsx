import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { useState } from "react";
import { commentPost } from "../../Actions/postAction.js";

export default function CommentSection({ post }) {
    // console.log(post);
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();

    async function handleClick() {

        const finalComment = `${user.result.name}:${comment}`;
        const newComment = await dispatch(commentPost(finalComment, post._id));

        setComments(newComment);
        setComment("");
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments :-</Typography>
                    {comments.map((c, i) => (
                        <Typography gutterBottom variant="subtitle1" key={i}>
                            <strong>{c.split(":")[0]}</strong>:-
                            {c.split(":")[1]}
                        </Typography>
                    ))}
                </div>
                {user?.result?.name && (
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
                        <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment || !user} variant="contained" onClick={handleClick} color="primary">
                            Comment
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
} 
