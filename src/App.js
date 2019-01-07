import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import ReactScrollbar from 'react-scrollbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import * as firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBYi0HSbsFNdlWoDfs4xyz5D7J9wIOlB7o",
  authDomain: "messagingapp-6247a.firebaseapp.com",
  databaseURL: "https://messagingapp-6247a.firebaseio.com",
  projectId: "messagingapp-6247a",
  storageBucket: "messagingapp-6247a.appspot.com",
  messagingSenderId: "176353794667"
};
firebase.initializeApp(config);

var database = firebase.database();

window.firebase = firebase

class ChatRoom extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue1: "",
      inputValue2: "",
      counter: 0,
      reactID: "0.03",
      messages: [


      ],
    };
  }
  componentDidMount() {
    var messagesRef = firebase.database().ref("messages")
    messagesRef.on("value", (snapshot) => {
      this.setState({messages: Object.values(snapshot.val())})
      console.log(this.state.messages);
    })

  }

  addMessage(msg) {
   
    var random = Math.floor(Math.random() * 1000000)
    var messageRef = firebase.database().ref("messages/" + random)
    
    messageRef.set({
      text: msg,
      email: firebase.auth().currentUser.email
    })
  }

  switchToSignIn() {
   
    this.setState({ reactID: "0.01" })
  }
  
  


  render() {

  

    var humanStyle = {
      backgroundColor: "red",
      marginLeft: "15%",
      marginTop: "4%",
      marginRight: "15%"
    }
    var stateMessages = this.state.messages;

    var user = firebase.auth().currentUser


    return (
      <div className="ChatRoom">
        <header className="App-header">
        
          <Grid className="Messaging-Board" item xs={10}>

            <ReactScrollbar speed={0.8} className="scroll" horizontal={false}>
              
              {
                stateMessages.map(message => {
                  
                return <Grid item xs={10} style={humanStyle} >
                  <label>{message.email}</label>
                  <br />
                  {message.text}
                  </Grid>
                

              })}
            </ReactScrollbar>
          </Grid>
          <Grid className="one" item xs={4}>
            <label>{user.email}</label>
            <TextField value={this.state.value} onChange={event => this.setState({ inputValue1: event.target.value })}> </TextField>
            <button type="submit" onClick={() => this.addMessage(this.state.inputValue1, firebase.auth().currentUser.email)}>send</button>
          </Grid>

        </header>
      </div>
    );
  }
}

var x = Math.floor(Math.random() * (1000 - 50) + 50)



class App extends Component {
  constructor(props) {
    super(props);
  

    this.state = {
      name: "",
      picURL: "",
      email: "",
      password: "",
      reactID: "0.01",
      counter: "0",
    };
  }

  createAccount(email, password, username) {

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

      console.log(error.code);
      console.log(error.message);
      window.alert(error.message);
    });
    firebase.auth().currentUser.displayName = username;
    
    this.setState({ reactID: "0.01" })
  }
  writeUserData1(name, picURL, email, password, reactID) {
    firebase.database().ref('user/' + x).set({
      name: name,
      picURL: picURL,
      email: email,
      password: password,
    });
  }

  switchToSignUp() {
    this.setState({ reactID: "0.02" })
  }
  switchToSignIn() {
    this.setState({ reactID: "0.01" })
  }
  validateAndTransition(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      window.alert(errorMessage);
      // ...
    });
    this.setState({ reactID: "0.03" })
  }
  render() {

    var styleObject1 = {
      marginLeft: "34.3%"
    }
    var styleObject2 = {
      marginLeft: "33.5%",
      fontSize: "45px"
    }
    var styleObject3 = {
      marginLeft: "45%",
    }

  
    if (this.state.reactID == 0.01) {
      var x;

      x = (
        <div className="Form">

          <Grid item xs={12}><h1 style={styleObject2}>Sign In!</h1></Grid>
          <Grid item xs={12} > <TextField type="email" required  label="Required" helperText="Email" style={styleObject1} margin="normal" value={this.state.value} onChange={event => this.setState({ email: event.target.value })}> </TextField> </Grid>
          <Grid item xs={12}>
            <TextField required

              label="Required"
              helperText="Password"
              type="password"
              style={styleObject1}
              margin="normal" value={this.state.value} onChange={event => this.setState({ password: event.target.value })}> </TextField>
          </Grid>

          <Grid item xs={12} style={styleObject3}>
            <button type="submit" onClick={() => this.validateAndTransition(this.state.email, this.state.password, this.state.name)}>Sign In!</button>
          </Grid>
          <Grid item xs={12} style={styleObject3}> <button type="submit" onClick={() => this.switchToSignUp()}>Sign Up!</button>
          </Grid>
        </div>
      )
    }



    if (this.state.reactID == 0.02) {

      var x;

      x = (
        <div className="Form">
          <Grid item xs={12}><h1 style={styleObject2}>Sign Up!</h1></Grid>
          <Grid item xs={12} > <TextField required id="standard-required" type="email" label="Required" helperText="Email" style={styleObject1} margin="normal" value={this.state.value} onChange={event => this.setState({ email: event.target.value})}> </TextField> </Grid>
          <Grid item xs={12}>
            <TextField required
              id="standard-required"
              label="Required"
              helperText="Password"
              type="password"
              style={styleObject1}
              margin="normal" value={this.state.value} onChange={event => this.setState({ password: event.target.value})}> </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField required
              id="standard-required"
              label="Required"
              helperText="Username"
              style={styleObject1}
              margin="normal" value={this.state.value} onChange={event => this.setState({ name: event.target.value })}> </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField required
              id="standard-required"
              label="Required"
              helperText="profile picture URL"
              style={styleObject1}
              margin="normal" value={this.state.value} onChange={event => this.setState({ picURL: event.target.value })}> </TextField>
            <Grid item xs={12} style={styleObject3}> <button type="submit" onClick={() => this.createAccount(this.state.email, this.state.password)}>Sign Up!</button>
            </Grid>
          </Grid>
          <Grid item xs={12} style={styleObject3}>
            <button type="submit" onClick={() => this.switchToSignIn()}>Sign In!</button>
          </Grid>

        </div>
      )
    }
    if (this.state.reactID == 0.03) {
      var chatRoom = <ChatRoom></ChatRoom>
    }

    return (
      <div>
        {x}{chatRoom}
      </div>

    )
  }
}
export default App;
