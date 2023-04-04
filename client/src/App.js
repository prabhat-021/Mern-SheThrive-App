import React, { useEffect, useState } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import Form from "./Components/Form/Form.js";
import Posts from "./Components/Posts/Posts.js";
import userStyles from "./styles.js";
import { useDispatch } from "react-redux";
import { getPosts } from "./Actions/postAction.js";
import Navbar from "./Components/Navbar/Navbar";

export default function App() {

  const [currentId, setCurrentId] = useState(null);
  const classes = userStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch])


  return (
    <Container maxWidth="xl">
      <Navbar />
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignitems="stretch" spacing={5} className={classes.mainContainer}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

