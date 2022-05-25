const request = require("supertest");
const app = require("../main.js");

describe("GET /users", () => {
  test("should respond with a 200 status code", () => {
    request(app).get("/users").expect(200);
  });
});

describe("POST testing/users", () => {
  const user = {
    id: null,
    name: "Username",
    email: "test2@example.com",
    password: "123456",
    role: "user",
    confirmed: false,
    createdAt: null,
    updatedAt: null,
  };
  let token;
  it("Create a user", (done) => {
    request(app)
      .post("/users")
      .send(user)
      .expect(201)
      .end((err, res) => {
        // console.log({...res.body.user});
        // console.log(user);
        expect({
          ...res.body.user,
          id: null,
          createdAt: null,
          updatedAt: null,
        }).toEqual(user);
        done();
      });
  });
  it("Login a user", (done) => {
    request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "123456" })
      .expect(200)
      .end((err, res) => {
        // console.log({...res.body.user});
        // console.log(user);
        token = res.body.token;
        console.log(res.body);
        expect("Holi " + user.name).toEqual("Holi " + user.name);
        done();
      });
  });
  it("Update a user record", (done) => {
    const updateUser = { name: "Updated name" };
    // console.log(token);
    request(app)
      .put("/users/id/1")
      .send(updateUser)
      .set({ Authorization: token })
      .expect(200)
      .end((err, res) => {
        // console.log(res);
        expect(res.body).toEqual("Usuario actualizado con éxito");
        done();
      });
  });
});
