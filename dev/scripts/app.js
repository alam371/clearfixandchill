import React from 'react';
import ReactDOM from 'react-dom';

// Initialize Firebase 
var config = { 
  apiKey: "AIzaSyDe_d0Pclc-V9J4jB0XahcsK1NmY0Ibnew", 
  authDomain: "cohort17yearbook.firebaseapp.com",
  databaseURL: "https://cohort17yearbook.firebaseio.com", 
  projectId: "cohort17yearbook", 
  storageBucket: "cohort17yearbook.appspot.com",
  messagingSenderId: "285245183197" 
}; 
firebase.initializeApp(config);

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      messages: [""],
      message:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount(){
    const dbRef = firebase.database().ref('/messages');
    dbRef.on('value', (snapshot) => {
      const info = snapshot.val();
      const state = [];
      for(let key in info) {
        info [key].key = key;
        state.push(info[key]);
      }
      this.setState({
        messages: state
      });
    });
  }

  // addMessage(e){
  //   e.preventDefault();
  //   const messageState = Array.from(this.state.messages);
  //   messageState.push(this.state.message);
  //   this.setState({
  //     messages: messageState,
  //     message:""
  //   });
  // }
  addMessage(e) {
    e.preventDefault();
    const message = {
      message: this.state.message
    };

    let listofMessage = Array.from(this.state.messages);
    listofMessage.push(message);
    this.setState({
      messages: listofMessage
    })

    const dbRef = firebase.database().ref('/messages');
    dbRef.push(message);
    this.setState({
      message:''
    });
  }
    render() {
      return (
        <div>
          <div className="messageBoxText">
            <h3>Cohort 17 Take Aways!</h3>
          </div>
          <form onSubmit={this.addMessage}>
            <input type="text" name="message" value={this.state.message} onChange={this.handleChange}/>
            <button>Add a message!</button>
          </form>
          <div className="messageContainerBox">
            {this.state.messages.map((message, i) => {
              return <MessageItem data={message}  key={`message-${i}`} />
            })}
          </div>
        </div>
      )
    }
}

const MessageItem = (props) => {
  return(
    <div className="messageBox">{props.data.message}</div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
