const request = require('supertest');

const server = require('../src/js/server.js');

describe('Server testing', () => {
  afterAll(() => server.close());
    
  test('Get All Users', async () => {
    const res = await request(server).get('/api/users');
    const expectedArray = JSON.parse(res.text);
    expect(Array.isArray(expectedArray)).toEqual(true);
    expect(res.statusCode).toEqual(200);
  });

  let id;
  test('Create a User', async () => {
    const user = {
      username: 'Ihar',
      age: 33,
      hobbies: ['Node'],
    };
    const res = await request(server).post('/api/users').send(user);
    id = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('Ihar');
    expect(res.body.age).toBe(33);
    expect(res.body.hobbies).toEqual(['Node']);
  });

  test('Get Single User', async () => {
    const res = await request(server).get(`/api/users/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('Ihar');
    expect(res.body.age).toBe(33);
    expect(res.body.hobbies).toEqual(['Node']);
  });

  test('Get All Users Updated', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    const expectedArray = JSON.parse(res.text);
    expect(Array.isArray(expectedArray)).toEqual(true);   
    expect(expectedArray[0].username).toBe('Ihar');
    expect(expectedArray[0].age).toBe(33);
    expect(expectedArray[0].hobbies).toEqual(['Node']);
  });

  test('Updates a User', async () => {
    const user = {
      username: 'Igor',
      age: 37,
      hobbies: ['Node', 'Angular'],
    };
    const res = await request(server).put(`/api/users/${id}`).send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('Igor');
    expect(res.body.age).toBe(37);
    expect(res.body.hobbies).toEqual(['Node', 'Angular']);
  });

  test('Deletes a User', async () => {
    const res = await request(server).delete(`/api/users/${id}`);
    expect(res.statusCode).toBe(204);
    expect(res.body).toBeFalsy();
  });
});
