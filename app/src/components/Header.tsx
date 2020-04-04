import React from 'react'
import {Toolbar, AppBar, Typography} from '@material-ui/core';
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
    }),
);

export default function Header(){
    const classes = useStyles();

    return (
        <AppBar position="static" color="default" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={""}>
                Berlin Chat
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
