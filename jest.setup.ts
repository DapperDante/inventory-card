import { dbComponent } from "./src/components/database.component";
import { redisComponent } from "./src/components/redis.component";
import { beforeAll, afterAll } from "@jest/globals";

beforeAll(async () => {
  await dbComponent.connect();
  await redisComponent.connect();
});

afterAll(async () => {
  await dbComponent.component.close();
  await redisComponent.component.quit();
});