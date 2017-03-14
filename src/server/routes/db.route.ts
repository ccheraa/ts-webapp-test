import { Server, Controller, Route, Handles, ModelRoutes } from '@ts-webapp/back';
import { DBUrl } from '@ts-webapp/common';
import { UserModel, UserModelUrl, DemoModel, DemoModelUrl } from '../db';

let clients = {};
export const DBRoute = new Controller(DBUrl(), [
  ...ModelRoutes(UserModel, UserModelUrl),
  ...ModelRoutes(DemoModel, DemoModelUrl),
]);
