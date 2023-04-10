import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import moment from "moment";
import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core";
import useStyles from "./styles";

export default function PostDetails() {

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const posts = useSelector((state) => state.postReducer.posts);
  // const post = useSelector((state) => state.postReducer);
  const isLoading = useSelector((state) => state.postReducer.isLoading);
  // console.log(post);
  console.log(isLoading);
  console.log(posts)

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{posts.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{posts.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{posts.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${posts.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${posts.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(posts.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={posts.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={posts.title} />
        </div>
      </div>
    </Paper>
  );
}
