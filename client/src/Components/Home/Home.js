import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from "@material-ui/core";
import Form from "../Form/Form.js";
import Posts from "../Posts/Posts.js";
import { useDispatch } from "react-redux";
import { getPosts, getPostBySearch } from "../../Actions/postAction.js";
import userStyles from "./styles.js";
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

// Constructor
// The URLSearchParams interface defines utility methods to work with the query string of a URL.
// Creates a URLSearchParams object given any existing query string that is on the url.

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Home() {

    const [currentId, setCurrentId] = useState(null);
    const classes = userStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    // this will going to read our url and see if we have age paramenter
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");

    useEffect(() => {

        dispatch(getPosts());

    }, [currentId, dispatch]);

    function handleKeyPress(e) {
        if (e.keyCode === 13) {
            // search post 
            searchPost();
        }

    };

    function handleAdd(tag) {
        setTags([...tags, tag])
    };

    function handleDelete(deleteTag) {
        setTags(tags.filter((tag) => tag !== deleteTag))
    };

    function searchPost() {
        if (search.trim() || tags) {
            
            dispatch(getPostBySearch({ search, tags: tags.join(",") }));
            navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`)

        } else {
            navigate("/");
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignitems="stretch" spacing={3} className={classes.mainContainer}>
                    <Grid item xs={12} sm={6} md={9} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Post"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: "10px 0" }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}