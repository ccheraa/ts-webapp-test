export * from './db.route';
import { DBRoute } from './db.route';
import { UserModel } from '../db';
import { UserController } from '@ts-webapp/back';
export const ROUTES = [DBRoute, UserController(UserModel)];