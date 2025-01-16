import { Avatar, Button, Container, Grid, Paper, Typography } from "@mui/material";
import useStyles from "./styles.js";
import LockOutlineIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input.js";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
// import Icon from "./Icon.js";
import { useNavigate } from "react-router-dom"
import { signIn, signUp } from "../../Actions/authActions.js";


export default function Auth() {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", password: "", confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // console.log(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isSignup) {
            dispatch(signUp(formData, navigate));
        } else {
            dispatch(signIn(formData, navigate));
        }
    }

    function switchMode() {
        setIsSignup(!isSignup);
        setShowPassword(false);
    }

    function handleShowPassword() {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    function GoogleFailure() {
        console.error("Google Sign In was unsuccessfull. Try Again Later");
    }

    function GoogleSuccess(res) {
        try {
            // console.log(res);
            const token = res.credential;
            var result = jwt_decode(token);
            // console.log(decoded);
            dispatch({ type: "AUTH", payload: { result, token } });
            navigate("/");
        } catch (error) {
            console.error(error);
        }

    }

    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => console.log(tokenResponse),
    //     onError: errorResponse =>console.log(errorResponse)
    // });

    return (
        <Container component="Main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlineIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "SignUp" : "SignIn"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input
                                        name="firstName"
                                        label="First Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input
                                        name="lastName"
                                        label="Last Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                </>
                            )
                        }
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {
                            isSignup && (
                                <Input
                                    name="confirmPassword"
                                    label="Repeat Password"
                                    handleChange={handleChange}
                                />
                            )
                        }
                    </Grid>
                    {/* <Button
                        className={classes.googleButton}
                        color="primary"
                        fullWidth
                        onClick={login}
                        startIcon={<Icon />}
                        variant="contained"
                    >
                        Google Sign In
                    </Button> */}
                    <GoogleLogin
                        className={classes.googlebutton}
                        onSuccess={GoogleSuccess}
                        onError={GoogleFailure}
                        theme="filled_blue"
                        size="large"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an Account? Sign In" : "Don't have an Account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}