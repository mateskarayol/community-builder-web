/*import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    users: [],
    community : ""
  };


------------------------------------------------------
 GET REQUEST 
------------------------------------------------------

  async componentDidMount() {
    const response = await fetch('/getUser');
    const body = await response.json();
    console.log(body);
    this.setState({ users: body, isLoading: false });
  }
    
  render() {
    const {users, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-intro">
            <h2>JUG List</h2>
            {users.map(user =>
              <div key={user.username}>
                {user.name}
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }

------------------------------------------------------

------------------------------------------------------
GET REQUEST - REQUEST PARAM
------------------------------------------------------

  async componentDidMount() {
    const response = await fetch('/getUserByUsername?username=mkarayol5');
    const body = await response.json();
    console.log(body);
    this.setState({ users: body, isLoading: false });
  }
------------------------------------------------------

------------------------------------------------------
POST REQUEST - REQUEST AND RESPONSE BODY
------------------------------------------------------

 async componentDidMount() {
      const communitydata = {
        "community" :  {
          "id" : "2",
          "name" : "react developers",
          "explanation" : "sharing platform for developers"
        }
      }

      const url = "/saveCommunity"

      const response = await fetch(url, {  method: "POST", 
                    body: JSON.stringify(communitydata), 
                    headers:{ "Content-Type": "application/json" } 
                  });
                  

      const res = await response.json();
      console.log(res);
      this.setState({ community: res.response, isLoading: false });

}

render() {
    const {community, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-intro">
            <h2>JUG List</h2>
            {community.communityName}
          </div>
        </header>
      </div>
    );
  }



}
------------------------------------------------------


export default App;

*/