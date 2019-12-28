
import React from 'react';
import { Col, Row, Button, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ChoiceField from './ChoiceField';

const PostField = ({    idx, 
                        postFieldArr, 
                        postFieldChangeHandler, 
                        postFieldDeleteHandler,
                        choiceFieldAddHandler,
                        choiceFieldChangeHandler,
                        showChoiceField    }) => {

    let reqId = 'req-$(idx)', lblId = 'lbl-$(idx)', typId='typ-$(idx)', expId ='exp-$(idx)'

    return (
        <FormGroup>
            <Row>
                <Col sm={2}>
                { postFieldArr[idx].default ?  
                        <Input type = "checkbox" 
                            data-id = {idx}
                            data-name = "required"
                            name = {reqId} 
                            value = {true}
                            onChange = {postFieldChangeHandler} 
                            className = "centeredCheck"
                            disabled checked></Input> 
                        : 
                        <Input type = "checkbox" 
                            data-id = {idx}
                            data-name = "required"
                            name = {reqId} 
                            value = {postFieldArr[idx].required}
                            onChange = {postFieldChangeHandler} 
                            className = "centeredCheck"
                            ></Input> }
       
                </Col>
                <Col sm={3}> 
                    { postFieldArr[idx].default ?   
                    <Input  type = "text" 
                        data-id = {idx}
                        data-name = "fieldLabel"
                        name = {lblId}
                        value = {postFieldArr[idx].fieldLabel}
                        onChange = {postFieldChangeHandler} disabled></Input>
                    :
                    <Input  type = "text" 
                        data-id = {idx}
                        data-name = "fieldLabel"
                        name = {lblId}
                        value = {postFieldArr[idx].fieldLabel}
                        onChange = {postFieldChangeHandler} ></Input>
                    }
                </Col>
                <Col sm={3}>   
                    { postFieldArr[idx].default ?  
                    <Input type = "select" 
                        data-id = {idx}
                        data-name = "fieldType"
                        name = {typId} 
                        value = {postFieldArr[idx].fieldType}
                        onChange = {postFieldChangeHandler}  disabled>
                        <option value ="" >Select</option>
                        <option value ="TEXT" >Text</option>
                        <option value ="NUMBER" >Number</option>
                        <option value ="DATETIME" >DateTime</option>
                        <option value ="IMAGE" >Image</option>
                        <option value ="CHOICE" >Choice</option>

                    </Input>
                    :
                    <Input type = "select" 
                        data-id = {idx}
                        data-name = "fieldType"
                        name = {typId} 
                        value = {postFieldArr[idx].fieldType}
                        onChange = {postFieldChangeHandler}  >
                        <option value ="" >Select</option>
                        <option value ="TEXT" >Text</option>
                        <option value ="NUMBER" >Number</option>
                        <option value ="DATETIME" >DateTime</option>
                        <option value ="IMAGE" >Image</option>
                        <option value ="CHOICE" >Choice</option>
                    </Input>
                        }
                </Col>
                <Col sm={3}>
                    { postFieldArr[idx].default ? 
                    <Input type = "text" 
                        data-id = {idx}
                        data-name = "explanation"
                        name = {expId} 
                        value = {postFieldArr[idx].explanation}
                        onChange = {postFieldChangeHandler} disabled >
                    </Input>
                    :
                    <Input type = "text" 
                        data-id = {idx}
                        data-name = "explanation"
                        name = {expId} 
                        value = {postFieldArr[idx].explanation}
                        onChange = {postFieldChangeHandler}  >
                    </Input>
                    }
                </Col>
                <Col sm={1}>
                    { postFieldArr[idx].default ?
                    ''
                    : 
                    <Button  data-id = {idx}
                        onClick = {postFieldDeleteHandler}  >
                    Remove</Button>
                    }
                    
                </Col>
            </Row>
            { showChoiceField ? (
                                        <Row>
                                            <Col sm={8}></Col>
                                            <Col sm={3}>
                                                <ChoiceField postFieldId = {idx}
                                                            postField = {postFieldArr[idx]}
                                                            choiceField = {postFieldArr[idx].choiceField} 
                                                            choiceFieldAddHandler = {choiceFieldAddHandler}
                                                            choiceFieldChangeHandler = {choiceFieldChangeHandler} ></ChoiceField>
                                            </Col>
                                            <Col sm={1}></Col>
                                        </Row>
            ): null }
        </FormGroup>
      );
};


export default PostField;