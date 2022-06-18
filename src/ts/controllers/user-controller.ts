import { IncomingMessage, ServerResponse } from 'http';

import { DataBase } from '../database/database';
import { userType } from '../models/user.model';

const SERVER_ERROR_MESSAGE = 'Internal Server Error';
const REQUEST_BODY_ERROR_MESSAGE = 'Request Body Does Not Contain Required Fields';

const sendAnswer = (response: ServerResponse, outputStatusCode: number, outputContent: string) => {
  response.writeHead(outputStatusCode, {'Content-Type': 'application/json'});
  response.end(outputContent);
}

// @desc Gets All Users
// @route GET /api/users
export const getUsers = async (response: ServerResponse, database: DataBase) => {
  let outputContent = '';
  let outputStatusCode: number;
  try {
    const users: userType[] = await database.getUsers();
    outputContent = JSON.stringify(users);
    outputStatusCode = 200;
  } catch (err) {
    outputContent = JSON.stringify({message: SERVER_ERROR_MESSAGE});
    outputStatusCode = 500;
  }
  sendAnswer(response, outputStatusCode, outputContent);
}

// @desc Create a User
// @route POST /api/users
export const createUser = async (request: IncomingMessage, response: ServerResponse, database: DataBase) => {
  let outputContent = '';
  let outputStatusCode: number;
  try {
    let body = '';
    request.on('data', chunk => body += chunk.toString());

    request.on('end', async () => {
      const { username, age, hobbies } = JSON.parse(body);
      if (username && age && hobbies && typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)) {
        const newUser = {
          username,
          age,
          hobbies,
        };
        
        const user: userType = await database.createUser(newUser);
        outputContent = JSON.stringify(user);
        outputStatusCode = 201;
      } else {
        outputContent = JSON.stringify({message: REQUEST_BODY_ERROR_MESSAGE});
        outputStatusCode = 400;
      }
      sendAnswer(response, outputStatusCode, outputContent);
    });
  } catch (err) {
    outputContent = JSON.stringify({message: SERVER_ERROR_MESSAGE});
    outputStatusCode = 500;
    sendAnswer(response, outputStatusCode, outputContent);
  }
}