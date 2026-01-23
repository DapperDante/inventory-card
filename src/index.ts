import { dbComponent } from "./components/database.component";
import { redisComponent } from "./components/redis.component";
import { serverComponent } from "./components/server.component";

dbComponent.connect();
redisComponent.connect();
serverComponent.connect();

export { serverComponent, dbComponent, redisComponent };