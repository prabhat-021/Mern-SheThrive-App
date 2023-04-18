import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import moment from "moment";
import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core";
import useStyles from "./styles";
import { getPostById } from "../../Actions/postAction.js";
import CommentSection from './CommentSection.jsx';


export default function PostDetails() {

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const posts = useSelector((state) => state.postReducer.posts);
  const post = useSelector((state) => state.postReducer.post);
  const isLoading = useSelector((state) => state.postReducer.isLoading);
  // console.log(post);
  // console.log(isLoading);
  // console.log(posts);

  useEffect(() => {

    dispatch(getPostById(id));

  }, [id,dispatch]);

  // useEffect(() => {

  //   dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }));

  // }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  function openPost(_id) {

    navigate(`/posts/${_id}`);

  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5' >
            You might also like :
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
              <div style={{ margin: "20px", cursor: "pointer" }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant='h6'>{title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                <Typography gutterBottom variant='subtitle1'>Likes :{likes.length}</Typography>
                <img src={selectedFile} alt="PostsImage" width="200px" />
              </div>
            ))}
          </div>
        </div>
      )
      }
    </Paper >
  );
}
