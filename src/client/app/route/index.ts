import { RouterModule } from '@angular/router';
import { HomeRoute } from './home.route';
import { ClientRoute } from './client.route';
let routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  ...HomeRoute,
  ...ClientRoute,
  {path: '**', redirectTo: '/home'}
];
export const ROUTES = RouterModule.forRoot(routes);
// export const ROUTED_COMPONENTS: any[] = routes
// 	.map(item => (item as any).component)
// 	.filter(item => !!item);