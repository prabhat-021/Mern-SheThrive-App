import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import useStyles from "./styles.js";

export default function Paginate() {

    const classes = useStyles();

    return (
        <Pagination
            className={{ ul: classes.ul }}
            count={5}
            page={5}
            variant="outlined"
            color='primary'
            renderItem={(item) => {
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
            }}
        />
    );
}