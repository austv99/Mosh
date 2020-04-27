import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent: 'center',
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
}));

export default function ImageAvatar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={props.title} src={props.img} className={classes.large} />
    </div>
  );
}