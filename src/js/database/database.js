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
exports.DataBase = void 0;
const uuid_1 = require("uuid");
class DataBase {
    constructor() {
        this.users = [];
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultUser = {
                username: '',
                age: 0,
                hobbies: [],
            };
            const users = this.users;
            const user = users.find(el => el.id === id);
            return (user) ? user : defaultUser;
        });
    }
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = JSON.parse(JSON.stringify(newUser));
            user.id = this.createId();
            this.users.push(user);
            return user;
        });
    }
    updateUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = JSON.parse(JSON.stringify(newUser));
            this.users.forEach((oldUser, index) => {
                if (oldUser.id === updatedUser.id)
                    this.users[index] = updatedUser;
            });
            return updatedUser;
        });
    }
    deleteUser(userToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            let foundIndex = null;
            this.users.forEach((user, index) => {
                if (user.id === userToDelete.id)
                    foundIndex = index;
            });
            if (foundIndex)
                this.users.splice(foundIndex, 1);
        });
    }
    createId() {
        let id = '';
        let isUnique = false;
        while (!isUnique) {
            id = (0, uuid_1.v4)();
            let found = false;
            this.users.forEach(el => {
                if (el.id === id)
                    found = true;
            });
            if (!found)
                isUnique = true;
        }
        return id;
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=database.js.map