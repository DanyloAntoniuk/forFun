import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  }

  componentDidMount() {
    this.callApi()
      .then(res => {console.log(res);this.setState({ response: res.posts[0].title })})
      .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('http://localhost:3001/api/posts?page=6' , {
      method: 'GET',
      headers: {
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZWdhc2VjcmV0Iiwic3ViIjoiNWMwNTQzMzg2MDM3MjIyNThhNmRlNzBhIiwiaWF0IjoxNTQ1MzIwMTc0MDQxLCJleHAiOjE1NDUzMjczNzQwNDF9.5ZlI8lH3TGBae-4BRyBEZsbSHwtE72sTxso7s-GO5-0"
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="Apps">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;
