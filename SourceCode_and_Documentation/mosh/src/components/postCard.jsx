import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let textTheme = createMuiTheme();
textTheme = responsiveFontSizes(textTheme);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '2%',
    flexGrow: 1,
  },
  content: {
    flex: '1 0 auto',
    paddingBottom: 0
  },
  cover: {
    minWidth: 62,
    width: "20%", 
    maxWidth: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function PostCard(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const[count, setCount] = useState(0);
  
  return (
    <Card className={classes.root}>
        <CardMedia
            className={classes.cover}
            image = {props.img}
            title="Avatar Image"
        />
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <ThemeProvider theme={textTheme}>
                  <Typography variant="h6">
                      <b> {props.title} </b>
                  </Typography>
                  <h5>
                      <b> {props.content} </b>
                    </h5>
                </ThemeProvider>
            </CardContent>
            <div style = {{display: 'flex', justifyContent: "flex-end", alignItems : "center"}}>
                <h5>{props.tag}</h5> 
                <ThumbUpAltIcon/>
                <h5>{count}</h5> 
                <Button variant="contained" color="default" className = {classes.button} onClick={() => setCount(count + 1)}>
                    Like
                </Button>
                <Button variant="contained" color="default" className = {classes.button}>
                    Comment
                </Button>
            </div>
        </div>

    </Card>
  );    
}
