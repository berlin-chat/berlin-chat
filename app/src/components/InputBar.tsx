import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(0, 3),
            width: "100%"
        },
        textField: {
            width: "100%",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
        }
    }),
);

export default function InputBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField className={classes.textField} id="outlined-basic" label="Enter Message ..."/>
        </div>
    );
}
