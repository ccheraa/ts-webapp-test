import { HomeComponent, TestComponent } from '../component';
import { NavigatorService, canDeactivate } from '@ts-webapp/front';
export const HomeRoute = [
  {path: 'home', component: HomeComponent, canDeactivate},
  {path: 'test', component: TestComponent, canDeactivate},
];