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
//     width: '100%',
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// });


// class Login extends Component {
//   constructor(props ) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//     this.signup = this.signup.bind(this);
//     this.state = {
//       email:'',
//       password:'',
//       firstname:'',
//       lastname:''
//     };
//   }

//   handleChange(e) {
//     this.setState({[e.target.name]: e.target.value });
//   }



//   login(e) {
//     e.preventDefault();
//     fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
//     }).catch((error) => {
//         console.log(error);
//       });
//   }

//   signup(e){
//     e.preventDefault();
//     fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
//     }).then((u)=>{console.log(u)})
//     .catch((error) => {
//         console.log(error);
//       })
//   }
//   render() {
//     const{classes} = this.props;
//     return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>M</Avatar>
//         <Typography component="h1" variant="h5">
//           Sign Up
//         </Typography>
//         <form className={classes.form} noValidate>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
              
//               name="firstname"
//               variant="outlined"
//               required
//               fullWidth
//               label="First Name"
//               onChange={this.handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               name="lastname"
//               variant="outlined"
//               required
//               fullWidth
//               label="Last Name"
//               onChange={this.handleChange}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               name="email"
//               variant="outlined"
//               required
//               fullWidth
//               type="email"
//               label="Email Address"
//               onChange={this.handleChange}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               name="password"
//               variant="outlined"
//               required
//               fullWidth
//               type="password"
//               label="Password"
//               onChange={this.handleChange}
//             />
//           </Grid>
//         </Grid>

//          <Button
//            type="submit"
//            fullWidth
//            variant="contained"
//            color="primary"
//            className={classes.submit}
//            onClick={this.signup}
//          >
//            Sign Up
//          </Button>
//          <Grid container justify="flex-end">
//            <Grid item>
//              <Link href="SignIn" variant="body2">
//                Already have account? Sign In
//              </Link>
//            </Grid>
//          </Grid>
//         </form>
//        </div>
//     </Container>

//     );
//   }
// }
// export default withStyles(classes,{withTheme : true}) (Login);
