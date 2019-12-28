import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, ListGroup,ListGroupItem } from 'reactstrap';
import BasicModal from './BasicModal';
import CreatePostType from './CreatePostType';
import CommunityHome from './CommunityHome';
import { Redirect } from "react-router-dom";


class CreateCommunityForm extends Component {
  /*
    - the value of the name attribute on each input must be the same 
      with the state name declared in the formControls in the constructor. 

  */
  constructor() {
    super();
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.createCommunityHandler = this.createCommunityHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.clearState = this.clearState.bind(this);
    this.redirectToCommunityHome = this.redirectToCommunityHome.bind(this);

    this.state = {
      form: {
        id : '',
        name:'',
        explanation:'',
        bannerPic : '',
        postTypeSet : [
          {
            id : '',
            name : 'Basic Post',
            explanation : 'Basic post for general purposes',
            postFieldSet : [
                                { fieldKey : "post_name",
                                  required : false,
                                  fieldLabel : 'Post Name',
                                  fieldType : 'TEXT',
                                  explanation : 'Post Name'
                                },
                                { fieldKey : "message",
                                  required : false,
                                  fieldLabel : 'Message',
                                  fieldType : 'TEXT',
                                  explanation : 'Message'
                                },
                                { fieldKey : "semantic_tag",
                                  required : false,
                                  fieldLabel : 'Tags',
                                  fieldType : 'SEMANTICTAG',
                                  explanation : 'Tags'
                                }
                              ]
          }
        ],
      },
      result : '',
      showMessage : false,
      showCommunityHome : false
    }
  }

  inputChangeHandler = event => {
    // event.target returns the <input/> component 
    // you should merge state !!!!
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      form : {
        ...this.state.form,
        [name]: value
      },
      result : ''
    });
  }

  clearState(){
    this.setState({
      form: {
        name:'',
        explanation:'',
        bannerPic:'',
        postTypeSet : []
      }
    });
  }

  savePostTypeHandler = form => {
    
    this.setState({
      
        form: {
          ...this.state.form,
          postTypeSet : [
            ...this.state.form.postTypeSet,
            {
              name : form.postTypeName,
              explanation : form.postTypeDesc,
              postFieldSet : form.postFields
            }
          ],
        },
        createPost : false

    });

  }

  createCommunityHandler = event => {
    
    event.preventDefault();
    const communitydata = {
      "community" :  {
        "name" : this.state.form.name,
        "explanation" : this.state.form.explanation,
        "bannerPic" : this.state.form.bannerPic,
        "postTypeSet" : this.state.form.postTypeSet
      }
    }

    const url = "/saveCommunity"

    fetch(url, {  method: "POST", 
                  body: JSON.stringify(communitydata), 
                  headers:{ "Content-Type": "application/json" } 
                })
                .then( response => response.json())
                .then( result  => {  this.setState({
                                                ...this.state,
                                                form : result.response.community
                                            });
                                this.redirectToCommunityHome();
                              }
                );
    // result.response buradaki response response objelerinin içerisindeki attribute name  
    
    var message = `Community is created successfully.` ;

    console.log(message);
    this.setState( { result: message , showMessage : true }) ;
  }

  toggle() {
    this.setState({
      showMessage: !this.state.showMessage
    });
  }

  redirectToCommunityHome (){
    this.setState({
      ...this.state,
      showCommunityHome : true
    })
  }


  render(){

  let postTypeSet = this.state.form.postTypeSet;

    const communityHome = (<Redirect to={{  pathname : "/communityHome",
                                            props : {
                                              community : this.state.form
                                            }
                                          }}/>);
    const createCommunityForm = (
      <div>
      <Form onSubmit =  {this.createCommunityHandler} >
        <FormGroup row>
          <Label  sm={12} size="lg">Create Community</Label>
        </FormGroup>
        <FormGroup row>
          <Label for = "communityNameInp" sm={4} size="md">Community Name</Label>
          <Col sm={8}>
            <Input id = "communityNameInp" type = "text" name = "name" value = {this.state.form.name} onChange = {this.inputChangeHandler}></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={12} size="md">Smart and brief description displayed in community card.</Label>
        </FormGroup>
        <FormGroup row>
          <Col sm={12}>
            <Input id = "communityDescInp" type = "textarea" name = "explanation" value = {this.state.form.explanation} onChange = {this.inputChangeHandler}></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for = "bannerPicInp" sm={4} size="md">Picture</Label>
          <Col sm={8}>
            <Input id = "bannerPicInp" type = "text" name = "bannerPic" value = {this.state.form.bannerPic} onChange = {this.inputChangeHandler}></Input>
          </Col>
        </FormGroup>
        
        
        <FormGroup row>
          <Label  sm={12} size="lg">Post Type List</Label>

          { postTypeSet !== '' &&
            <ListGroup>
              {
                postTypeSet.map((val, idx) =>  (
                  <ListGroupItem className = "leftList" id = {idx} > {postTypeSet[idx].name} </ListGroupItem>
                ))
              }

            </ListGroup>
          }
           <Label for = "bannerPicInp" sm={4} size="md">Basic Post Type is created as default. You can create more post types later.</Label>
        </FormGroup>

        { this.state.createPost && <CreatePostType savePostTypeHandler = {this.savePostTypeHandler} /> }
        <Button color = "success" >Create Community</Button>  

      </Form>
      { this.state.showMessage && <BasicModal isOpen={true} message={this.state.result} 
                                              modalTitle ="Info" toggle = {this.toggle}/> }
    </div>
    );

    return ( this.state.showCommunityHome ? communityHome : createCommunityForm);
  }
}

export default CreateCommunityForm;

