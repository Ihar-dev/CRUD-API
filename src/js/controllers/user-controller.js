"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleUser = exports.updateSingleUser = exports.createUser = exports.getSingleUser = exports.getUsers = void 0;
const uuid_1 = require("uuid");
const SERVER_ERROR_MESSAGE = 'Internal Server Error';
const REQUEST_BODY_ERROR_MESSAGE = 'Request Body Does Not Contain Required Fields';
const UUID_ERROR_MESSAGE = 'UserId Is Invalid (not uuid)';
const USER_ERROR_MESSAGE = 'UserId Is Not Found';
const sendAnswer = (response, outputStatusCode, outputContent) => {
    response.writeHead(outputStatusCode, { 'Content-Type': 'application/json' });
    response.end(outputContent);
};
const getUsers = (response, database) => __awaiter(void 0, void 0, void 0, function* () {
    let outputContent = '';
    let outputStatusCode;
    try {
        const users = yield database.getUsers();
        outputContent = JSON.stringify(users);
        outputStatusCode = 200;
    }
    catch (err) {
        outputContent = JSON.stringify({ message: SERVER_ERROR_MESSAGE });
        outputStatusCode = 500;
    }
    sendAnswer(response, outputStatusCode, outputContent);
});
exports.getUsers = getUsers;
const getSingleUser = (response, database, id) => __awaiter(void 0, void 0, void 0, function* () {
    let outputContent = '';
    let outputStatusCode = 0;
    try {
        if ((0, uuid_1.validate)(id)) {
            const user = yield database.findUser(id);
            if (user.id) {
                outputContent = JSON.stringify(user);
                outputStatusCode = 200;
            }
            else {
                outputContent = JSON.stringify({ message: USER_ERROR_MESSAGE });
                outputStatusCode = 404;
            }
        }
        else {
            outputContent = JSON.stringify({ message: UUID_ERROR_MESSAGE });
            outputStatusCode = 400;
        }
    }
    catch (err) {
        outputContent = JSON.stringify({ message: SERVER_ERROR_MESSAGE });
        outputStatusCode = 500;
    }
    sendAnswer(response, outputStatusCode, outputContent);
});
exports.getSingleUser = getSingleUser;
const getBodyData = (request) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            request.on('data', chunk => body += chunk.toString());
            request.on('end', () => resolve(body));
        }
        catch (err) {
            reject(err);
        }
    });
};
const createUser = (request, response, database) => __awaiter(void 0, void 0, void 0, function* () {
    let outputContent = '';
    let outputStatusCode = 400;
    try {
        const body = yield getBodyData(request);
        let falsyBody = true;
        if (body) {
            const userObj = JSON.parse(body);
            if (Object.keys(userObj).length === 3) {
                const { username, age, hobbies } = userObj;
                if (username && age && hobbies && typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)) {
                    const newUser = {
                        username,
                        age,
                        hobbies,
                    };
                    const user = yield database.createUser(newUser);
                    outputContent = JSON.stringify(user);
                    outputStatusCode = 201;
                    falsyBody = false;
                }
            }
        }
        if (falsyBody)
            outputContent = JSON.stringify({ message: REQUEST_BODY_ERROR_MESSAGE });
        sendAnswer(response, outputStatusCode, outputContent);
    }
    catch (err) {
        outputContent = JSON.stringify({ message: SERVER_ERROR_MESSAGE });
        outputStatusCode = 500;
        sendAnswer(response, outputStatusCode, outputContent);
    }
});
exports.createUser = createUser;
const updateSingleUser = (request, response, database, id) => __awaiter(void 0, void 0, void 0, function* () {
    let outputContent = '';
    let outputStatusCode = 0;
    try {
        let body = '';
        request.on('data', chunk => body += chunk.toString());
        request.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            if (body) {
                const { username, age, hobbies } = JSON.parse(body);
                if (username && age && hobbies && typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)) {
                    const newUser = {
                        username,
                        age,
                        hobbies,
                        id,
                    };
                    if ((0, uuid_1.validate)(id)) {
                        const user = yield database.findUser(id);
                        if (user.id) {
                            const user = yield database.updateUser(newUser);
                            outputContent = JSON.stringify(user);
                            outputStatusCode = 200;
                        }
                        else {
                            outputContent = JSON.stringify({ message: USER_ERROR_MESSAGE });
                            outputStatusCode = 404;
                        }
                    }
                    else {
                        outputContent = JSON.stringify({ message: UUID_ERROR_MESSAGE });
                        outputStatusCode = 400;
                    }
                }
                else {
                    outputContent = JSON.stringify({ message: REQUEST_BODY_ERROR_MESSAGE });
                    outputStatusCode = 400;
                }
                sendAnswer(response, outputStatusCode, outputContent);
            }
        }));
    }
    catch (err) {
        outputContent = JSON.stringify({ message: SERVER_ERROR_MESSAGE });
        outputStatusCode = 500;
        sendAnswer(response, outputStatusCode, outputContent);
    }
});
exports.updateSingleUser = updateSingleUser;
const deleteSingleUser = (response, database, id) => __awaiter(void 0, void 0, void 0, function* () {
    let outputContent = '';
    let outputStatusCode = 0;
    try {
        if ((0, uuid_1.validate)(id)) {
            const user = yield database.findUser(id);
            if (user.id) {
                yield database.deleteUser(user);
                outputContent = JSON.stringify('');
                outputStatusCode = 204;
            }
            else {
                outputContent = JSON.stringify({ message: USER_ERROR_MESSAGE });
                outputStatusCode = 404;
            }
        }
        else {
            outputContent = JSON.stringify({ message: UUID_ERROR_MESSAGE });
            outputStatusCode = 400;
        }
    }
    catch (err) {
        outputContent = JSON.stringify({ message: SERVER_ERROR_MESSAGE });
        outputStatusCode = 500;
    }
    sendAnswer(response, outputStatusCode, outputContent);
});
exports.deleteSingleUser = deleteSingleUser;
//# sourceMappingURL=user-controller.js.map