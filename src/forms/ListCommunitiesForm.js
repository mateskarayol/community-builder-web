import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button} from 'reactstrap';
import CommunityCard from './CommunityCard';
import CommunityHome from './CommunityHome';



class ListCommunitiesForm extends Component {
  /*
    - the value of the name attribute on each input must be the same 
      with the state name declared in the formControls in the constructor. 

  */
  constructor() {
    super();
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.showCommunityHandler = this.showCommunityHandler.bind(this);
    this.searchCommunity = this.searchCommunity.bind(this);



    this.state = {
      showCommunityHome : false,
      community : '',
      keyword : '*',
      communityList : []
    }
  }

  showCommunityHandler = event => {
    this.setState({
      ...this.state,
      showCommunityHome : true,
      community : JSON.parse(event.target.dataset.community)
    })
  }

  inputChangeHandler = event => {
    // event.target returns the <input/> component 
    // you should merge state !!!!
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  searchByKeywordHandler = event => {
    event.preventDefault();
    this.searchCommunity();
  }


  componentDidMount() {
    this.searchCommunity();
  }

  searchCommunity(){
    let url = '';
    if(this.state.keyword == '*')
      url = '/getCommunityList';
    else
      url = `/searchCommunity?keyword=${this.state.keyword}`;

    const response = fetch(url).then( response => response.json())
                              .then( result => this.setState( { communityList : result.response.communityList }));
  }


  render(){
    let communityList = this.state.communityList;

    const listCommunities = (
      <div>
        <div className="listBody">

            <InputGroup>
              <Input type = "text" name = "keyword" sm={5} 
                value = {this.state.keyword}   
                onChange = {this.inputChangeHandler} 
                placeholder = "Search community"> </Input>
              <InputGroupAddon addonType="append">
                <Button color="success" onClick={this.searchByKeywordHandler}>Search</Button>
              </InputGroupAddon>
            </InputGroup>
            

            { communityList !== '' && <CommunityCard   communityList = {communityList} showHandler={this.showCommunityHandler}/> }

        </div>   
      </div> 
    );   
    let list = this.state.communityList;
    console.log(this.state.community);

    const communityHome = ( <CommunityHome community = {this.state.community}/>);

    return (this.state.showCommunityHome ? communityHome : listCommunities) ;
  }
};

export default ListCommunitiesForm;

