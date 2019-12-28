import React, { Component } from 'react';
import './App.css';
import Homepage from './forms/Homepage';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CreateCommunityForm  from "./forms/CreateCommunityForm";
import CreatePostType  from "./forms/CreatePostType";
import ListCommunitiesForm  from "./forms/ListCommunitiesForm";
import CommunityHome  from "./forms/CommunityHome";
import CreatePost  from "./forms/CreatePost";

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-intro">
            <Link to = "/homepage" color="secondary">Community Builder</Link>  
          </div>
        </header>
        <footer>
          <Router>
            <Switch>
                <Route  exact 
                        path="/" 
                        component={Homepage} />
                <Route  exact 
                        path="/homepage" 
                        component={Homepage} />
                <Route  exact 
                        path="/createCommunity" 
                        component={CreateCommunityForm} />
                <Route  exact
                        path="/createPostType" 
                        component={CreatePostType} />
                <Route  exact 
                        path="/listCommunities" 
                        component={ListCommunitiesForm} />
                <Route  exact 
                        path="/communityHome"  
                        render={(props) => <CommunityHome {...props}/> }/>
                <Route  exact 
                        path="/createPost"  
                        render={(props) => <CreatePost {...props}/> }/>
            </Switch>
          </Router>
        </footer>
      </div>
    );
  }



}

export default App;