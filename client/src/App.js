import React from "react";
import { Container, Grid, AppBar, Typography, Grow } from "@material-ui/core";
import memories from "./images/memories.png";
import Form from "./Components/Form/Form.js";
import Posts from "./Components/Posts/Posts.js";
import userStyles from "./styles.js";

export default function App() {

  const classes = userStyles();

  return (
    <Container maxWidth="xl">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="centre">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="streach" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

