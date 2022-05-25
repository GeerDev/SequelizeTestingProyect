const request = require("supertest");
const app = require("../main.js");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

describe("GET /users", () => {
  test("should respond with a 200 status code", () => {
    request(app).get("/users").expect(200);
  });
});

describe("POST testing/users", () => {
  const user = {
    id: null,
    name: "Username",
    email: "test@example.com",
    password: "123456",
    role: "user",
    confirmed: false,
    createdAt: null,
    updatedAt: null,
  };
  const emailToken = jwt.sign({ email: user.email }, jwt_secret, {
    expiresIn: "48h",
  });
  let token;
  it("Create a user", (done) => {
    request(app)
      .post("/users")
      .send(user)
      .expect(201)
      .end((err, res) => {
        const createdUser = {
          ...user,
          id: res.body.user.id,
          createdAt: res.body.user.createdAt,
          updatedAt: res.body.user.updatedAt,
        };
        expect(res.body.user).toEqual(createdUser);
        done();
      });
  });
  it("Confirm a user", (done) => {
    request(app)
      .get("/users/confirm/" + emailToken)
      .expect(201)
      .end((err, res) => {
        console.log(res.text);
        expect(res.text).toEqual("Usuario confirmado con éxito");
        done();
      });
  });
  it("Login a user", (done) => {
    request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "123456" })
      .expect(200)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  it("Update a user record", (done) => {
    const updateUser = { name: "Updated name" };
    request(app)
      .put("/users/id/1")
      .send(updateUser)
      .set({ Authorization: token })
      .expect(200)
      .end((err, res) => {
        expect(res.text).toEqual("Usuario actualizado con éxito");
        done();
      });
  });
});
