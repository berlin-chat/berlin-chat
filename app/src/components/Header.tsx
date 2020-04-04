import React from 'react'
import {Toolbar, AppBar, Typography, Button} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
        },
        userName: {
            marginLeft: 'auto',
            fontWeight: 'bold'
        }
    }),
);

type Props = {
    user: string,
    logout: any
}

export default function Header({user, logout}: Props){
    const classes = useStyles();

    return (
        <AppBar position="static" color="default" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={""}>
                Berlin Chat
                </Typography>
                <p className={classes.userName}>
                    {user}
                </p>
                <br />
                <Button onClick={logout} color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    )
}
