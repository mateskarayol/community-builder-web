import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Input, Media, Container, Row, Col, Label, Button} from 'reactstrap';
import CreatePostType from './CreatePostType';
import PostCard from "./PostCard";

import { withRouter } from 'react-router-dom';

class CommunityHome extends Component {

  constructor(props){
    super();
    this.openCreatePostTypeHandler.bind(this.openCreatePostTypeHandler);
    this.postTypeChangeHandler.bind(this.postTypeChangeHandler);
 
    this.state = {
      community : props.location.props.community,
      showCreatePostType : false,
      selectedPostType : 0,
      postList : []

    }
  }

  searchPost(){
    
    let url = `/getPostsByCommunityId?communityId=${this.state.community.id}`;

    const response = fetch(url).then( response => response.json())
                              .then( result => this.setState( { ...this.state, postList : result.response.postList }));
  }

  openCreatePostTypeHandler  = event => {
    this.setState({
      ...this.state,
      showCreatePostType : true,
      community : JSON.parse(event.target.dataset.community)
    })
  }

  postTypeChangeHandler = event => {
    //const id = event.target.dataset.id;

    let index = event.nativeEvent.target.selectedIndex;
    let fieldId = event.nativeEvent.target[index].dataset.id
    let x = index-1;
    this.setState({
      ...this.state,
      selectedPostType : this.state.community.postTypeSet[x]
    })
  }
 

  render(){

    this.searchPost();
    const postTypeSet = this.state.community.postTypeSet;
    const communityHome = (
    <div>
      <Container>
          <Row>
            <Col></Col>
            <Col className="centeredText">  <h2>{this.state.community.name}</h2> </Col>
            <Col></Col>
          </Row>
          <Row>
            
          </Row>
          <Row className="communityBanner">
            <Col></Col>
            <Col>
                <Media>
                  <Media object  middle src= {this.state.community.bannerPic}  />
                </Media>
            </Col>
            <Col></Col>
          </Row>
      </Container>
      <Container className ="fiveMargin" >
          <Row >
            <Col sm ={4}>
              <Link to = {{ pathname : "/createPostType",
                            props : {
                              community : this.state.community
                            }
                          }} color="secondary">
                          <Button color="primary">Create New Post Type</Button>
             </Link> 
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <Label>In order to create new post; </Label>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Input type="select" name="select" onChange = {this.postTypeChangeHandler} >
                <option data-id = "0" > Select Post Type </option>
                  {
                      postTypeSet.map((val, idx) =>  (
                        <option data-id = {postTypeSet[idx].id} > {postTypeSet[idx].name} </option>
                    ))
                  }
              </Input>
            </Col>
            <Col sm={4}> 
              <Link to = {{ pathname : "/createPost",
                            props : {
                              postType : this.state.selectedPostType,
                              community : this.state.community
                            }
                          }} color="secondary">
                          <Button color="primary">Create New Post</Button>
              </Link> 

            </Col>
          </Row>
         
        </Container>
        <Container>
          <PostCard postList = {this.state.postList}></PostCard>
        </Container>
      </div>
      );

    return (communityHome ) ;
  }
}


export default CommunityHome;