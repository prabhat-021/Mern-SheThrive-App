import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Actions/postAction";
import useStyles from "./styles.js";

export default function Paginate({ page }) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const { numberOfPages } = useSelector((state) => state.postReducer);

    useEffect(() => {

        if (page) dispatch(getPosts(page));

    }, [page])

    return (
        <Pagination
            className={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color='primary'
            renderItem={(item) => <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />}
        />
    );
}