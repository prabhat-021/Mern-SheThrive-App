import Post from "./Post/Post.js";
import { useSelector } from "react-redux";
import useStyles from "./style.js";
import { Grid, CircularProgress } from "@material-ui/core";

export default function Posts() {

    const classes = useStyles();
    const posts = useSelector((state) => state.postReducer);
    console.log(posts);

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}