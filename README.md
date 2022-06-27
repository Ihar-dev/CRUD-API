## How to Install The Application:
"git clone https://github.com/Ihar-dev/CRUD-API.git" or

"git clone git@github.com:Ihar-dev/CRUD-API.git"

then

"npm i"

## How to Use The Aplication:
"npm run start:prod" to run the app in production mode with nodemon

"npm run start:dev" to run the app in development mode with nodemon

"npm run start:multi" to run the app in multi mode with nodemon

"npm run start" to run the app with node

## Endpoints:

GET method "localhost:4000/api/users" Gets All Users

GET method "localhost:4000/api/users/:userId" Gets Single User

POST method "localhost:4000/api/users" Creates a User

PUT method "localhost:4000/api/users/:userId" Updates a User

DELETE method "localhost:4000/api/users/:userId" Deletes a User

##### Users are stored as objects that have following properties:
##### id — unique identifier (string, uuid) generated on server side
##### username — user's name (string, required)
##### age — user's age (number, required)
##### hobbies — user's hobbies (array of strings or empty array, required)
