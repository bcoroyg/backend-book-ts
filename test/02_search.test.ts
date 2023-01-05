import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src';

afterAll(async () => {
  await mongoose.connection.close()
});

test("[BOOK] should return one", async () => {
  const res = await request(app)
    .get(`/api/v1/search/java`)
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
});
