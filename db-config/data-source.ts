import * as config from "config";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: config.get<string>("dbConfiguration.host"),
  port: config.get<number>("dbConfiguration.port"),
  username: config.get<string>("dbConfiguration.username"),
  password: config.get<string>("dbConfiguration.password"),
  database: config.get<string>("dbConfiguration.database"),
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../**/migrations/*{.ts,.js}"],
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();
export default dataSource;
