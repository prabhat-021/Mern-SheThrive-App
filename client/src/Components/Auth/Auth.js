import { Avatar, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";
import useStyles from "./styles.js";
import LockOutlineIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input.js";
import { useState } from "react";

export default function Auth() {

    const classes = useStyles();
    const isSignup = !false;
    const[showPassword,setShowPassword]=useState(false);

    function handleSubmit() {

    }

    function handleChange() {

    }
    
    function handleShowPassword() {

    }

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
                                            name="firstname"
                                            label="First Name"
                                            onChange={handleChange}
                                            autoFocus
                                            half
                                        />
                                        <Input
                                            name="lastname"
                                            label="Last Name"
                                            onChange={handleChange}
                                            autoFocus
                                            half
                                        />
                                </>
                            )
                        }
                        <Input 
                            name="email"
                            label="Email Address"
                            onChange={handleChange}
                            type="email"
                        />
                        <Input 
                            name="password"
                            label="Password"
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}