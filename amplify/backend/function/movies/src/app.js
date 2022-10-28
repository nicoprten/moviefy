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

//ADD A MOVIE TO MOVIELIST
app.put('/movie', (req,res) => {
  const {movieListId, userId, newMovie} = req.body;
  const params = {
    TableName: process.env.STORAGE_MOVIELISTSDB_NAME,
    IndexName: 'ByMovieListId',
    Key: {
        'id' : movieListId,
        'user_id' : userId
      },
    UpdateExpression: `SET movies = list_append(movies, :newMovie)`,
    ExpressionAttributeValues: {
      ':newMovie' : newMovie
    }
  }

  docClient.update(params, (err, data) => {
    if (err) {
      res.json({msg:'UPDATE ERROR',err});
    }else {
      res.json({msg: 'UPDATE SUCCESS',data});
    }
  });
});

//DELETE A MOVIE OF MOVIELIST
app.post('/movie', (req, res) => {
  const {itemIndex} = req.body

  const params = {
    TableName: process.env.STORAGE_MOVIELISTSDB_NAME,
    IndexName: 'ByMovieListId',
    Key: {
        'id' : '4rg5mi3pqsol9nklrys',
        'user_id' : '7036d9d5-6a84-4a97-bb1f-f432297c01d4'
      },
    UpdateExpression: `REMOVE movies[${itemIndex}]`,
  };

  docClient.update(params, (err, data) => {
    if (err) {
      res.json({msg:'DELETE ERROR',err});
    }else {
      res.json({msg: 'DELETE SUCCESS',data});
    }
  });


});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
