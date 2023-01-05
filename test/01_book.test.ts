import { hash } from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src';
import config from '../src/config';
import { Book, User } from '../src/database/models';
import { testDataBook } from './helper';

let JWT_TOKEN = '';

const data = {
  username: config.defaultAdminUsername,
  password: config.defaultAdminPassword,
};

beforeAll(async () => {
  await Book.deleteMany({});
  await User.deleteMany({});
  //Creación de usuario test
  await User.create({
    username: data.username,
    password: await hash(<string>data.password, 10),
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('[AUTH] should to return token', async () => {
  const res = await request(app).post('/api/v1/auth/login').send(data);
  const { body } = res;
  JWT_TOKEN = body.token;
  expect(res.statusCode).toEqual(200);
});

test('[BOOK] should to create a book', async () => {
  const res = await request(app)
    .post('/api/v1/books')
    .set('Authorization', `Bearer ${JWT_TOKEN}`)
    .send(testDataBook);
  const { body } = res;
  expect(res.statusCode).toEqual(201);
  expect(body).toHaveProperty('data');
  expect(body).toHaveProperty('data.title');
  expect(body).toHaveProperty('data.description');
  expect(body).toHaveProperty('data.image');
});

test('[BOOK] should return all', async () => {
  const res = await request(app).get('/api/v1/books');
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty('data');
});

test('[BOOK] should return status 404', async () => {
  const bookDB = await Book.findOne({});
  const id = bookDB?._id.toString();
  const res = await request(app).get(`/api/v1/books/123456789009876543211234`);
  const { body } = res;
  expect(res.statusCode).toEqual(404);
});

test('[BOOK] should return one', async () => {
  const bookDB = await Book.findOne({});
  const id = bookDB?._id.toString();
  const res = await request(app).get(`/api/v1/books/${id}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty('data');
});

test('[BOOK] should to update a book', async () => {
  const bookDB = await Book.findOne({});
  const id = bookDB?._id.toString();
  const res = await request(app)
    .put(`/api/v1/books/${id}`)
    .set('Authorization', `Bearer ${JWT_TOKEN}`)
    .send(testDataBook);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty('data');
});

test('[BOOK] should to delete a book', async () => {
  const bookDB = await Book.findOne({});
  const id = bookDB?._id.toString();
  const res = await request(app)
    .delete(`/api/v1/books/${id}`)
    .set('Authorization', `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty('data');
});
