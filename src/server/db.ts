export * from '../common/db';
import { Model, AuthModel } from '@ts-webapp/back';

import {
  DemoModelScheme, DemoModelDefinition,
  UserModelScheme, UserModelDefinition,
/// imports
} from '../common/db';
export const DemoModel = new Model<DemoModelDefinition>('Demo', DemoModelScheme);
export const UserModel = new AuthModel<UserModelDefinition>('User', UserModelScheme);
/// exports
