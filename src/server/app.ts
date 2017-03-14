console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n-------------------------------------------------------------\n\n');
import * as chalk from 'chalk';
import '../common/route';
import { Server, DB, ModelRoutes } from '@ts-webapp/back';
import { ROUTES } from './routes';

function stamp(color: string, space = true): string {
  let time = new Date();
  let timeString =
    ('0' + time.getHours()).slice(-2)   + ':' +
    ('0' + time.getMinutes()).slice(-2) + ':' +
    ('0' + time.getSeconds()).slice(-2);
  return '[' + chalk[color](timeString) + ']' + (space ? ' ' : '');
}

export const server: Server = Server.bootstrap();

DB.connect('mongodb://localhost/db').subscribe(con => {
  console.log('DB connected');
});
server.middleware(function(req, res, next) {
  console.log(stamp('blue') + req.method + ': ' + req.url);
  next();
});

server.applyRoutes(ROUTES);

server.route('/api/routes', function(req, res, next) {
  res.json(server.routeReport());
});
server.route('/res/img/user/profile.jpg', function(req, res, next) {
  let avatar = 'src/public/res/img/user/' + Math.ceil(Math.random() * 5) + '.jpg';
  res.sendFile(require('path').resolve(avatar));
});

server.start(() => console.log('server started on ' + server.config.host + ':' + server.config.port));
