import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import IconButton from "@material-ui/core/IconButton"
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
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
    margin: theme.spacing(0),
  },
}));

export default function PostCard(props) {
  const classes = useStyles();

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
                  <div style = {{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
                    <Typography variant="h6">
                        <b> {props.title} </b>
                    </Typography>
                    <Typography variant = "caption">{props.tag}</Typography> 
                  </div>

                  <h5>
                      <b> {props.content} </b>
                    </h5>
                </ThemeProvider>
            </CardContent>
            <div style = {{display: 'flex', justifyContent: "flex-end", alignItems : "center", flexWrap: "wrap-reverse"}}>
                {/* <h5>{props.tag}</h5>  */}
                {/* <ThumbUpAltIcon/> */}
                <h5>{count} likes </h5> 
                <IconButton className = {classes.button} onClick={() => setCount(count + 1)}>
                  <ThumbUpAltIcon/>
                </IconButton>
                <IconButton className = {classes.button}>
                  <ChatBubbleIcon/>
                </IconButton >
                
                {/* <Button variant="contained" color="default" className = {classes.button} onClick={() => setCount(count + 1)} size = "small">
                    Like
                </Button> */}
                {/* <Button variant="contained" color="default" className = {classes.button} size = "small">
                    Comment
                </Button> */}
            </div>
        </div>

    </Card>
  );    
}
