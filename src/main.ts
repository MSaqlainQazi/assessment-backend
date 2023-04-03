import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as config from "config";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./common/exception-filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const port = config.get("port");
  const host = config.get("environment");
  await app.listen(port);
  console.log(`App is running at ${host}:${port}`);
}
bootstrap();
