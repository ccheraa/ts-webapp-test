import { Injectable } from '@angular/core';
import { ModelClient } from '@ts-webapp/front';
import {
  UserModelDefinition, UserModelUrl,
  DemoModelDefinition, DemoModelUrl,
/// imports
} from '../../../common/db';
import { Http } from '@angular/http';
@Injectable() export class UserModel extends ModelClient<UserModelDefinition> {
  public url = UserModelUrl;
  constructor(public http: Http) { super(); };
}
@Injectable() export class DemoModel extends ModelClient<DemoModelDefinition> {
  public url = DemoModelUrl;
  constructor(public http: Http) { super(); };
}
/// exports
export const MODELS = [
  UserModel,
  DemoModel,
/// models
];