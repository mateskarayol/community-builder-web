import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, CardColumns
} from 'reactstrap';
import { Link } from "react-router-dom";


const CommunityCard = ({ communityList, showHandler}) => {
  return (
    <div className="communityCardClass">
        <CardColumns>
            {
                communityList.map((val, idx) =>  (
                    <Card>
                        <CardHeader tag="h6">{communityList[idx].name}</CardHeader>
                        <CardImg top width="100%" src={communityList[idx].bannerPic} alt="Card image cap" />
                        <CardBody>
                            <CardText>{communityList[idx].explanation}</CardText>
                            <Link to = {{
                              pathname : "/communityHome",
                              props : {
                                community : communityList[idx]
                              }
                            }} color="secondary">Show</Link>  
                            
                        </CardBody>
                    </Card>      
                ))
            }
        </CardColumns>
      </div>
  );
};

export default CommunityCard;