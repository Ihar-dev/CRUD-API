type userType = {
  id: string,
  username: string,
  age: number,
  hobbies: string[],
}

export class DataBase {
  public readonly users: userType[] = [];

  public getUsers(): userType[] {
    return this.users;
  }

  public addUser(): userType {
    return {
      id: '',
      username: '',
      age: 0,
      hobbies: [],
    }
  }
}