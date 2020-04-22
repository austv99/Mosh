import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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
    maxWidth : 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function MusicCard(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [share, setShare] = React.useState(false);

  const handleClickShare = () => {
    setShare(true);
  };

  const handleCloseShare = () => {

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenLink = () => {
    setShare(false);
  };
  

  return (
    <>
    <Card className={classes.root}>
        <CardMedia
            className={classes.cover}
            image = {props.img}
            title="Album Art"
          style={{width: "150px", height:"150px"}}
        />
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <ThemeProvider theme={textTheme}>
                  <Typography variant="h6" style={{width: "300px", whiteSpace: "nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                      <b> {props.title} </b>
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                      <b> Artist </b> : {props.artist}
                  </Typography>
                  {props.album ?
                  <Typography variant="subtitle2" color="textSecondary">
                      <b> Album </b> : {props.album}
                  </Typography>
                  :
                  <div></div>
                  }
                </ThemeProvider>
            </CardContent>
            <div style = {{display: 'flex', justifyContent: "flex-end", alignItems : "flex-start"}}>
              <IconButton aria-label="play/pause" style = {{paddingTop: 0}} onClick={handleClickOpen}>
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>
            </div>
        </div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <div style={{backgroundColor: "#292b2a", color:"#ffffff"}}>
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <img src={props.img} alt="" style={{width: "250px", height:"250px"}}/>
          <DialogContentText id="alert-dialog-description" style={{color:"#ffffff"}}>
            {props.artist}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description" style={{color:"#ffffff"}}>
            {props.album}
          </DialogContentText>
          <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{display: "flex", alignItems: "center"}}>
          <img src={SpotifyIcon} alt="" style={{margin: "5px", paddingRight: "2vw"}}/>
          {console.log(links)}
          <a href={props.link} style={{textDecoration: "none", color:"inherit"}} target="_blank" rel="noopener noreferrer">
          <h4>Listen on Spotify</h4>
          </a>
          <IconButton onClick={handleClickShare}>
            <ShareIcon style={{paddingLeft: "1vw", color: "#ffffff"}}/>
          </IconButton>
          </div>
          <div style={{display: "flex", alignItems: "center"}}>
          <img src={YoutubeIcon} alt="" style={{margin: "5px", paddingRight: "2vw"}}/>
          <a href={links.youtube} style={{textDecoration: "none", color:"inherit"}} target="_blank" rel="noopener noreferrer">
          <h4>Listen on Youtube</h4>
          </a>
          <IconButton onClick={handleClickShare}>
            <ShareIcon style={{paddingLeft: "1vw", color: "#ffffff"}}/>
          </IconButton>
          </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
        </div> */}
        {/* <iframe width="1000" height="615" src={"https://embed.odesli.co/?url="+ props.link + "&theme=dark"} frameborder="0" allowtransparency allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"></iframe> */}
        <iframe width="600" height="500" src={"https://embed.odesli.co/?url="+ props.link + "&theme=dark"}frameBorder="0" allowtransparency="true" allowFullScreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"></iframe>
      </Dialog>

      <Dialog
        open={share}
        onClose={handleCloseShare}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShare} color="primary">
            Disagree
          </Button>
          <Button onClick={handleOpenLink} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

    </Card>
    </>
  );    
}
