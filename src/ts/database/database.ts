import { v4 as uuidv4 } from 'uuid';

import { userType } from '../models/user.model';

export class DataBase {
  public readonly users: userType[] = [];

  public async getUsers(): Promise < userType[] > {
    return this.users; 
  }

  public async createUser(newUser: userType): Promise < userType > {
    const user: userType = JSON.parse(JSON.stringify(newUser));
    user.id = this.createId();
    this.users.push(newUser);
    return user;
  }

  private createId(): string {
    let id = '';
    let isUnique = false;
    while (!isUnique) {
      id = uuidv4();
      let found = false;
      this.users.forEach(el => {
        if (el.id === id) found = true;
      });
      if (!found) isUnique = true;
    }
    return id;
  }
}