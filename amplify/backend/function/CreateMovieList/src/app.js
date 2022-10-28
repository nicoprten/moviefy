/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	AUTH_MOVIEFY4322A04F_USERPOOLID
	ENV
	REGION
	STORAGE_MOVIEFY_ARN
	STORAGE_MOVIEFY_NAME
	STORAGE_MOVIEFY_STREAMARN
	STORAGE_MOVIELISTSDB_ARN
	STORAGE_MOVIELISTSDB_NAME
	STORAGE_MOVIELISTSDB_STREAMARN
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

function id () {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

const getItems = async () => {
  try{
    const params = {
      TableName: process.env.STORAGE_MOVIEFY_NAME
    }
    const items = await docClient.scan(params).promise();
    return items;

  } catch(e){

    return e;

  }

}

// CREATE MOVIELIST
app.post('/movieList', function(req, res) {
  // Add your code here
  var params = {
    TableName: process.env.STORAGE_MOVIELISTSDB_NAME,
    Item: {
      id: id(),
      name: req.body.name,
      user_id: req.body.userId,
      movies: [],
      followers: []
    }
  }

  docClient.put(params, function (err, data) {
    if (err) {
      res.json({err});
    }else res.json({success: 'Movielist Created'})
  })
});

// GET ALL MOVIELISTS FROM ONE PARTICULAR USER
app.get('/movieList', function (req, res) {
  const {userIdent} = req.query;
  const params = {
    TableName: process.env.STORAGE_MOVIELISTSDB_NAME,
    // IndexName: 'ByUserMovieListIndex',
    KeyConditionExpression: 'user_id = :userId',
    ExpressionAttributeValues: {
      ':userId' : userIdent
    }
  }
  // const response = getItems();
  // res.json({response});
  docClient.query(params, (err, data) => {
    if (err) {
      res.json({err});
    }else {
      res.json({data});
    }
  })
});

// DELETE ONE MOVIELIST
app.post('/movieList/delete', (req,res) => {
  const {movieListId, userId} = req.body;

  const params = {
    TableName : process.env.STORAGE_MOVIELISTSDB_NAME,
    Key : {
      'user_id' : userId,
      'id' : movieListId
    }
  };

  docClient.delete(params, (err, data) => {
    if (err){
     res.json({msg:'ERROR DELETING MOVIELIST', err});
    }
    else {
      res.json({msg:'SUCCESS DELETING MOVIELIST', data});
    }
  })
})

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
