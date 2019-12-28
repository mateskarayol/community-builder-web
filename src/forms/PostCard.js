import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, CardColumns
} from 'reactstrap';
import { Link } from "react-router-dom";


const PostCard = ({ postList, showHandler}) => {

  return (
    <div className="communityCardClass">
        <CardColumns>
            {
                postList.map((val, idx) =>  (
                    <PostCardInfo fields = {postList[idx].fieldValueMap} tags = {postList[idx].semanticTagSet}></PostCardInfo>
                ))
            }
        </CardColumns>
      </div>
  );
};

const PostCardInfo = ({fields,tags}) => {
  let post_name =  '';
  return (
    
      <Card>
        {
              Object.keys(fields).map(function(key){
                if (key == 'post_name'){
                  post_name = fields[key];
                }
              })
            }
          <CardHeader tag="h6">{post_name}</CardHeader>
          <CardBody>
            {
              Object.keys(fields).map(function(key){
                // convert key to label
                if (key != 'post_name'){
                  var label = key.split('_').join(' ');
                  label = label[0].toUpperCase() + label.slice(1);
                  return <CardText>{label}: {fields[key]}</CardText>
               }
              })
            }
           <CardText> Tags : 
            {
                
                tags.map((val,idx) => (
                    '#' + val.label + ' | '
                ))
                
            }
            </CardText>
          </CardBody>
      </Card> 
    
  );
};

export default PostCard;