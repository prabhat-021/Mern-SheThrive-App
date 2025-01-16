import useStyles from "./styles.js";
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import memories from "../../images/memories.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import "./styles.css";

export default function Navbar() {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(user);

    function logout() {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        setUser(null);
    }

    const token = user?.token;
    useEffect(() => {

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location, token]);


    return (
        <AppBar className={classes.appBar} position="static" color="inherit" id="myAppBar">
            <Link to="/" className={classes.brandContainer}>
                <Typography className={classes.heading} variant="h2" alignitems="center" id="bold">SheThrive</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </Link>
            {/* <Button component={Link} to="https://technocrats.live/" variant="contained" color="secondary">
                Resources
            </Button>
            <Button component={Link} to="https://www.linkedin.com/feed/" variant="contained" color="secondary">
                Opportunities
            </Button> */}
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}