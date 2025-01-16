import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import useStyles from "./style.js";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { deletePost, likePost } from "../../../Actions/postAction.js";
import { useDispatch } from "react-redux";
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import { Link } from "react-router-dom";


export default function Post({ post, setCurrentId }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === user?.result.sub || user?.result._id)
                ? (
                    <>
                        <ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
                    </>
                ) : (
                    <>
                        <ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                    </>
                );
        }

        return <>
            <ThumbUpAltOutlined fontSize="small" />&nbsp;Like
        </>;
    }

    // function openPost() {

    //     navigate(`/posts/${post._id}`);

    // }

    return (
        <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} component={Link} to={`/posts/${post._id}`}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) &&
                (
                    <div className={classes.overlay2}>
                        <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )}
            <div className={classes.details} component={Link} to={`/posts/${post._id}`}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tags) => `#${tags}`)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result.sub === post?.creator || user?.result._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" /> &nbsp; Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}