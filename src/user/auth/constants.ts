import * as config from 'config';

export const jwtConstants = {
  secret: config.get<string>('secret_key'),
};
