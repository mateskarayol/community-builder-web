
import React from 'react';
import { Col, Row, Button, FormGroup, Input } from 'reactstrap';


const ChoiceField = ({postFieldId, postField, choiceField, choiceFieldAddHandler, choiceFieldChangeHandler }) => {
    
    return (
        <FormGroup>
            <Row>
                <Col sm={3}>    
                    <Input  type = "text" 
                            name = "choiceField"
                            value = {choiceField}
                            data-id = {postFieldId}
                            onChange = {choiceFieldChangeHandler} ></Input>
                </Col>
                <Col sm={1}>    
                    <Button  data-id = {postFieldId} data-name = "choiceFieldList" onClick = {choiceFieldAddHandler}>Add</Button>
                </Col>
            </Row>
            <Row>
                <Input type = "textarea" name = "choiceFieldList" id ={postFieldId}  value = {postField.choiceFieldSet}></Input>
            </Row>
        </FormGroup>
      );
};

export default ChoiceField;