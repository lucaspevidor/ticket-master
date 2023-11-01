import request from "supertest";
import { app } from "../../app";

test("Returns a 201 status on a successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

test("Returns a 400 status with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "password",
    })
    .expect(400);
});

test("Returns a 400 status with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1",
    })
    .expect(400);
});

test("Returns a 400 status with missing email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

test("Disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12345",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "123456",
    })
    .expect(400);
});

test("Sets a cookie after successful sign up", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12345",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
