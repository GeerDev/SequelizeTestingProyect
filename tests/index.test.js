const request = require('supertest');
const express = require('express');

const app = express();

describe("GET /users", () => {
  test("should respond with a 200 status code", () => {
    request(app).get("/users").expect(200)
  });
})

