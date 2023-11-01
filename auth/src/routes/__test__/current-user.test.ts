import request from "supertest";
import { app } from "../../app";

test("Responds with details about the current users", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", await signin())
    .send()
    .expect(200);

  expect(response.body.currentUser).toBeDefined();
  expect(response.body.currentUser.email).toEqual("test@test.com");
  expect(response.body.currentUser.id).toBeDefined();
});

test("Responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentUser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
  expect;
});
