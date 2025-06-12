import database from "./src/db/connection";
import { beforeAll, afterAll } from "@jest/globals";

beforeAll(async () => {
  await database.authenticate();
  await database.sync();
});

afterAll(async () => {
  await database.close();
});