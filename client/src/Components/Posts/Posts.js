import Post from "./Post/Post.js";
import { useSelector } from "react-redux";
import useStyles from "./style.js";

export default function Posts() {

    const classes = useStyles();
    const posts = useSelector((state) => state.postReducer);
    console.log(posts);

    return (
        <>
            <Post />
            <Post />
        </>
    );
}