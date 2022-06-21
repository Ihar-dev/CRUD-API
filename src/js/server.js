"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
require("dotenv/config");
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const database_1 = require("./database/database");
const user_controller_1 = require("./controllers/user-controller");
const database = new database_1.DataBase();
let PORT = Number(process.env.PORT);
const HOSTNAME = 'localhost';
const ROUTE_ERROR_MESSAGE = 'Route Not Found';
const requestHandler = (request, response) => {
    const { method, url } = request;
    if (method && url) {
        if (method === 'GET' && url === '/api/users')
            (0, user_controller_1.getUsers)(response, database);
        else if (method === 'GET' && url.match(/\/api\/users\/([0-9a-zA-Z-]+)/)) {
            const id = url.split('/')[3];
            (0, user_controller_1.getSingleUser)(response, database, id);
        }
        else if (method === 'PUT' && url.match(/\/api\/users\/([0-9a-zA-Z-]+)/)) {
            const id = url.split('/')[3];
            (0, user_controller_1.updateSingleUser)(request, response, database, id);
        }
        else if (method === 'DELETE' && url.match(/\/api\/users\/([0-9a-zA-Z-]+)/)) {
            const id = url.split('/')[3];
            (0, user_controller_1.deleteSingleUser)(response, database, id);
        }
        else if (method === 'POST' && url === '/api/users')
            (0, user_controller_1.createUser)(request, response, database);
        else {
            const outputContent = JSON.stringify({ message: ROUTE_ERROR_MESSAGE });
            const outputStatusCode = 404;
            response.writeHead(outputStatusCode, { 'Content-Type': 'application/json' });
            response.end(outputContent);
        }
    }
};
const server = (0, http_1.createServer)(requestHandler);
const runServer = () => {
    server.listen(PORT, HOSTNAME, () => {
        if (process.env.NODE_ENV !== 'test')
            console.log(`Сервер запущен на порту ${PORT}`);
    });
};
if (process.argv.length === 3 && process.argv[2] === 'multi') {
    if (cluster_1.default.isPrimary) {
        let cpus = os_1.default.cpus();
        cpus.forEach((el, index) => {
            const worker = cluster_1.default.fork({ WORKER_PORT: 4000 + index + 1 });
            worker.send(`Worker id: ${worker.id} launched`);
        });
    }
    else {
        if (process.env.WORKER_PORT)
            PORT = +process.env.WORKER_PORT;
        runServer();
        process.on('message', message => console.log(`Message from master: "${message}"`));
    }
}
else
    runServer();

module.exports = server;
//# sourceMappingURL=server.js.map