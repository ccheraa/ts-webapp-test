import { ModelDefinition } from '@ts-webapp/common';
export const UserModelUrl = '/user';
export interface UserModelDefinition extends ModelDefinition {
  username?: string;
  password?: string;
  name?: string;
};
export const UserModelScheme = {
  name: {type: String},
};