// import React, { Component } from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import { withStyles } from '@material-ui/core/styles';
// import fire from '../config/fire'

// const classes = theme => ({

//   paper: {
//     marginTop: theme.spacing(20),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.primary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// });

// class SignIn extends Component{
//   constructor(props ) {
//     super(props);
//     this.login = this.login.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {
//       email:'',
//       password:''
//     };
//   }
  
//   login(e) {
//     e.preventDefault();
//     fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
//     }).catch((error) => {
//         console.log(error);
//       });
//   }
//   handleChange(e){
//     this.setState({ [e.target.name]: e.target.value});
//   }

//   render(){
//     const {classes} = this.props;
//     return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>M</Avatar>
//           <Typography component="h1" variant="h5">
//             Sign In
//           </Typography>
//           <form className={classes.form} noValidate>
//             <TextField
//               margin="normal"
//               name="email"
//               variant="outlined"
//               required
//               fullWidth
//               type="email"
//               label="Email Address"
//               onChange={this.handleChange}
//             />
//             <TextField
//               margin="normal"
//               name="password"
//               variant="outlined"
//               required
//               fullWidth
//               type="password"
//               label="Password"
//               onChange={this.handleChange}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//               onClick={this.login}
//             >
//               Sign In
//             </Button>


//             <Grid container justify="flex-end">
//               <Grid item>
//                 <Link href="SignUp" variant="body2">
//                   Dont have account? Sign Up
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//       </Container>
//     );
//   }
// }
// export default withStyles(classes, {withTheme : true}) (SignIn);
