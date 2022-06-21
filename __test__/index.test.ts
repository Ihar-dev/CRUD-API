const request = require('supertest');

const server = require('../src/js/server.js');

describe('Server testing', () => {
  afterAll(() => server.close());
  
  let res;
  test('Gets All Users', async () => {
    res = await request(server).get('/api/users');
    const expectedArray = JSON.parse(res.text);
    expect(Array.isArray(expectedArray)).toEqual(true);
    expect(res.statusCode).toEqual(200);
  });

});
