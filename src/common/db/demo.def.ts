import { ModelDefinition } from '@ts-webapp/common';
export const DemoModelUrl = '/demo';
export interface DemoModelDefinition extends ModelDefinition {
  name?: string;
  age?: number;
};
export const DemoModelScheme = {
  name: {type: String},
  age: {type: Number},
};