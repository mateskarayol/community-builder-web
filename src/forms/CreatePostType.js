import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PostField from './PostField';
import { Redirect } from "react-router-dom";


class CreatePostType extends Component {

    constructor( props ) {
        super();

        /**-----------------------------------------------------------------*/
        /** Bindings                                                        */
        /** ----------------------------------------------------------------*/
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.addNewField = this.addNewField.bind(this);
        this.postFieldChangeHandler = this.postFieldChangeHandler.bind(this);
        this.postFieldDeleteHandler = this.postFieldDeleteHandler.bind(this);
        this.createPostTypeHandler = this.createPostTypeHandler.bind(this);
        this.choiceFieldAddHandler = this.choiceFieldAddHandler.bind(this);
        this.choiceFieldChangeHandler = this.choiceFieldChangeHandler.bind(this);

    
        this.state = {
          
          community : props.location.props.community,
          form: {
            name:'',
            explanation:'',
            postFieldSet :[
                          { fieldKey : "post_name",
                            required : true,
                            fieldLabel : 'Post Name',
                            fieldType : 'TEXT',
                            explanation : 'Post Name',
                            default : true
                          },
                          { fieldKey : "semantic_tag",
                            required : true,
                            fieldLabel : 'Tags',
                            fieldType : 'SEMANTICTAG',
                            explanation : 'Tags',
                            default : true
                          },
                          {  
                            required : true,
                            fieldLabel : '',
                            fieldType : '',
                            explanation : '' 
                        }]    
          },
          result : '',
          showCommunityHome : false
        }
      }

    /**----------------------------------------------------- */
    /** HANDLERS                                             */
    /**----------------------------------------------------- */
    createPostTypeHandler = event => {
      event.preventDefault();
      let communitydata = this.state.community;
      let postType =  this.state.form;

      communitydata.postTypeSet.push(postType);
      
      const requestbody = {
        "community" :  this.state.community
      }

      const url = "/saveCommunity";

      fetch(url, {  method: "POST", 
                    body: JSON.stringify(requestbody), 
                    headers:{ "Content-Type": "application/json" } 
                  })
                  .then( response => response.json())
                  .then(   result  => {  this.setState({
                                                        ...this.state,
                                                        community : result.response.community
                                                    });
                                        this.redirectToCommunityHome();
                                      }
                  );
      // result.response buradaki response response objelerinin içerisindeki attribute name  
    
      var message = `Post type is added successfully.` ;    
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
          }
        });
    }

    addNewField = event  => {
        this.setState(
            {
                form : {
                    ...this.state.form,
                    postFieldSet : [ 
                                    ...this.state.form.postFieldSet,
                                    {  
                                        required : false,
                                        fieldLabel : '',
                                        fieldType : 'Select',
                                        explanation : '' 
                                    }
                                ]
                }
            }
        );
    }

    postFieldChangeHandler = event => {
        const id = event.target.dataset.id;
        const name = event.target.dataset.name;
        const value = event.target.value;
        
        const updatedPostFieldSet = [...this.state.form.postFieldSet];
        updatedPostFieldSet[id][name] = value;

        if(name == 'fieldLabel'){
          let key = value;
          key = key.toLowerCase();
          key = key.split(' ').join('_');
          updatedPostFieldSet[id]['fieldKey'] = key;
        }

        if(name == 'fieldType'){
            if( value == 'CHOICE'){
              updatedPostFieldSet[id].showChoiceField = true;
              updatedPostFieldSet[id].choiceField = '';
              updatedPostFieldSet[id].choiceFieldSet = [];
            }
        }

        this.setState({
          form : {
            ...this.state.form,
            postFieldSet : updatedPostFieldSet,       
          }
        });
     
    }

    choiceFieldAddHandler = event => {
      const id = event.target.dataset.id;
      

      const updatedPostFieldSet = [...this.state.form.postFieldSet];
      let option = updatedPostFieldSet[id].choiceField;
      updatedPostFieldSet[id].choiceFieldSet.push(option);

      this.setState({
        form : {
          ...this.state.form,
          postFieldSet : updatedPostFieldSet,       
        }
      });
    }

    choiceFieldChangeHandler = event => {
        const id = event.target.dataset.id;
        const name = event.target.dataset.name;
        const value = event.target.value;
        
        const updatedPostFieldSet = [...this.state.form.postFieldSet];
        updatedPostFieldSet[id][name] = value;
        updatedPostFieldSet[id].choiceField = value;

    
        this.setState({
          form : {
            ...this.state.form,
            postFieldSet : updatedPostFieldSet,       
          }
        });
    }

    postFieldDeleteHandler = event => {
        const id = event.target.dataset.id;
        const postFieldSet = [...this.state.form.postFieldSet];
        postFieldSet.splice(id, 1);
        this.setState({
          form : {
            ...this.state.form,
            postFieldSet : postFieldSet     
          }
        });   
    }

    redirectToCommunityHome (){
      this.setState({
        ...this.state,
        showCommunityHome : true
      })
    }
  
  /**--------------------------------------------- */
  /** RENDER PAGE                                  */
  /**--------------------------------------------- */
  render(){

    let postFieldSet = this.state.form.postFieldSet;

    const communityHome = (<Redirect to={{  pathname : "/communityHome",
                                            props : {
                                              community : this.state.community
                                            }
                                          }}/>);

    const createPostType = (
        <Form onSubmit =  {this.createPostTypeHandler}>
          <FormGroup row>
            <Label  sm={12} size="lg">Community Post Type</Label>
          </FormGroup>
          <FormGroup row>
            <Label for = "postTypeInp" sm={4} size="md">Post Type Name</Label>
            <Col sm={8}>
              <Input id = "postTypeInp" type = "text" 
                    name = "name" 
                    value = {this.state.form.postTypeName} 
                    onChange = {this.inputChangeHandler}></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={12} size="md"> Why do people use this post type ?</Label>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input id = "postTypeDescInp" type = "textarea" 
                    name = "explanation" 
                    value = {this.state.form.communityDescription} 
                    onChange = {this.inputChangeHandler}></Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={12}>
              <Button onClick = {this.addNewField} color="secondary"> Add New Field </Button>  
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} size="md"> Required </Label>
            <Label sm={3} size="md"> Field Label </Label>
            <Label sm={3} size="md"> Data Type </Label>
            <Label sm={3} size="md"> Explanation </Label>
          </FormGroup>
          {
              postFieldSet.map((val, idx) =>  (
                <PostField
                        idx = {idx}
                        postFieldArr = {postFieldSet}
                        postFieldChangeHandler = {this.postFieldChangeHandler}
                        postFieldDeleteHandler = {this.postFieldDeleteHandler}
                        choiceFieldAddHandler = {this.choiceFieldAddHandler}
                        choiceFieldChangeHandler = {this.choiceFieldChangeHandler}
                        showChoiceField = {postFieldSet[idx].showChoiceField}
                />
              ))  
          }
           <Button color = "success" >Create Post Type</Button>  
          
        </Form>
  
      );

      return (this.state.showCommunityHome ? communityHome : createPostType);
  }
}
export default CreatePostType;






