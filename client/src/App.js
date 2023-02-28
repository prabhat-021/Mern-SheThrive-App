import React, { useEffect, useState } from "react";
import { Container, Grid, AppBar, Typography, Grow } from "@material-ui/core";
import memories from "./images/memories.png";
import Form from "./Components/Form/Form.js";
import Posts from "./Components/Posts/Posts.js";
import userStyles from "./styles.js";
import { useDispatch } from "react-redux";
import { getPosts } from "./Actions/postAction.js";

export default function App() {

  const [currentId, setCurrentId] = useState(null);
  const classes = userStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])


  return (
    <Container maxWidth="xl">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" alignitems="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignitems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

