import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
  },
  cover: {
    width: "20%",
    maxWidth : 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <Card className={classes.root}>
        <CardMedia
            className={classes.cover}
            image = {props.img}
            title="Album Art"
        />
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    <b> {props.title} </b>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    <b> Artist </b> : {props.artist}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    <b> Album </b> : {props.album}
                </Typography>
            </CardContent>
        </div>

        <div style = {{display: 'flex', flexDirection: 'column', justifyContent: "flex-end"}}>
            <IconButton aria-label="play/pause">
                <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
        </div>


    </Card>
  );    
}
