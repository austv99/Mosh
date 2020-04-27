import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

import ConcertModal from "../../concertComponents/concertModal"
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

export default function ConcertCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                  <Typography variant="subtitle2" color="textSecondary">
                      <b> Venue </b> : {props.venue}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                      <b> Date </b> : {props.date}
                  </Typography>
                </ThemeProvider>
            </CardContent>
            <div style = {{display: 'flex', justifyContent: "center", alignItems : "flex-start"}}>
                <Button variant="contained" color="default" className = {classes.button} onClick = {handleOpen}>
                    View More
                </Button>
            </div>
            <ConcertModal open = {open} handleClose = {handleClose} img = {props.img} title = {props.title} connected = {props.connected}/>
        </div>

    </Card>
  );    
}
