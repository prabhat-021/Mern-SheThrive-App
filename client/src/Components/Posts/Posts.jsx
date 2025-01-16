import Post from "./Post/Post.jsx";
import { useSelector } from "react-redux";
import useStyles from "./style.js";
import { Grid, CircularProgress } from "@mui/material";

export default function Posts({ setCurrentId }) {

    const classes = useStyles();
    const posts = useSelector((state) => state.postReducer.posts);
    const isLoading = useSelector((state) => state.postReducer.isLoading);
    // console.log(posts);

    if (!posts.length && !isLoading) return "No Posts"

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}