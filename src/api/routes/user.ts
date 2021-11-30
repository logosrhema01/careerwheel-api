import { Router, Request, Response } from 'express';
import { Logger } from 'winston';
import { IUser } from '../../interfaces/IUser';
import { Container } from 'typedi';
import middlewares from '../middlewares';
import mongoose from 'mongoose';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });
  route.post('/achievements', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    const user = req.currentUser;
    const Logger: Logger = Container.get('logger');

    try {
      const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;
      UserModel.updateOne({ email: user.email }, { $push: { achievements: req.body } });
    } catch (e) {
      Logger.error(`🔥 Error on event achievement log for user ${user.email}: %o`, e);

      // Throw the error so the process die (check src/app.ts)
      throw e;
    }
    return res.json({ user: req.currentUser }).status(200);
  });

  route.post('/goals', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    const user = req.currentUser;
    const Logger: Logger = Container.get('logger');

    try {
      const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;
      UserModel.updateOne({ email: user.email }, { $push: { goals: req.body } });
    } catch (e) {
      Logger.error(`🔥 Error on event goals log for user ${user.email}: %o`, e);

      // Throw the error so the process die (check src/app.ts)
      throw e;
    }
    return res.json({ user: req.currentUser }).status(200);
  });
};
