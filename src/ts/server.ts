import { createServer, IncomingMessage, ServerResponse } from 'http';

import { DataBase } from './database/database';

const database = new DataBase(); 
const PORT = 5000;
const HOSTNAME = 'localhost';
 
const requestHandler = (request: IncomingMessage, response: ServerResponse) => {
  const { method, url } = request;
  
  let outputContent = '';
  let outputStatusCode: number;
  if (method && url) {
    if (method === 'GET' && url === '/api/users') {
      outputContent = JSON.stringify(database.getUsers());
      outputStatusCode = 200;
    } else if (method === 'POST' && url === '/api/users') {
      outputContent = JSON.stringify(database.addUser());
      outputStatusCode = 201;
    } else {
      outputContent = JSON.stringify({message: 'Route Not Found'});
      outputStatusCode = 404;
    }

    console.log({ method, url });
    console.log({ method, url } === { method: 'GET', url: '/api/users' });

    response.writeHead(outputStatusCode, {'Content-Type': 'application/json'});
    response.end(outputContent);
  }
};

const server = createServer(requestHandler);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
