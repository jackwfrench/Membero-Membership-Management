import express from 'express';
import { Request, Response, NextFunction } from 'express';
import dbconnect from './db/db';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ErrorHandler, handleError } from './helpers/error';

// import routes
import organisation from './routes/organisation.route';
import admin from './routes/admin.route';
import member from './routes/member.route';

// setup db
const DBURI: string = 'mongodb://localhost/membero';
dbconnect(DBURI);

// config app
const app = express();
app.set('port', 3000);

// config middleware
app.use(cors({ origin: 'http://localhost:8080', preflightContinue: true, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config routes
app.use('/organisation', organisation);
app.use('/admin', admin);
app.use('/member', member);

// config error middleware
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  console.log(err);
  handleError(err, res);
});

// run app
app.listen(app.get('port'), () => {
  console.log(`app is running on http://localhost:${app.get('port')}`);
});
