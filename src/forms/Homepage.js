import React, {Component} from "react";
import { Link } from "react-router-dom";
import { InputGroup, InputGroupAddon, Input, Button} from 'reactstrap';

class Homepage extends Component {

  render(){
    return (
      <div>
        <div className="homeBody">
            <br/>
            <Link to = "/listCommunities">
              <Button color="success">List Communities</Button>
            </Link>  
            <br/>
            <br/>
            <h2>or</h2>
            <br/>
            <br/>
            <Link to = "/createCommunity" >
              <Button color="success">Create New Community</Button>
            </Link>  
        
        </div>   
      </div>    
    );
  }
}


export default Homepage;