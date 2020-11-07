import { KeySetting, KeyDocument } from '../models/KeySetting';
import { Request, Response, NextFunction } from 'express';
import { WriteError } from 'mongodb';
import { check, validationResult } from 'express-validator';
import { getSelectFields } from '../util/util';

export const getKeySetting = async (req: Request, res: Response) => {
  const selectFields = getSelectFields(req.query.name as string);
  console.log('selectFields', selectFields);
  const result = await KeySetting.find({ name: req.query.name }, selectFields);
  res.json({
    code: 0,
    data: {
      keys: result,
    },
  });
};

export const saveKeys = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('name', 'name is required').isLength({ min: 1 }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    next(errors);
  }

  const keys = new KeySetting({
    name: req.body.name,
    key: req.body.key,
    secret: req.body.secret,
    scope: req.body.scope,
    clientID: req.body.clientID,
    createUser: req.body.createUser,
    updateUser: req.body.updateUser,
  });

  KeySetting.findOne(
    { key: req.body.key, name: req.body.name },
    (err, existingKey) => {
      if (err) {
        return next(err);
      }
      if (existingKey) {
        console.log('existingKey', existingKey);
        req.flash('errors', { msg: 'key already exists.' });
        return next(existingKey);
      }
      keys.save((err: WriteError, created: KeyDocument) => {
        console.log('err', err);
        if (err) {
          return next(err);
        }
        res.json({
          code: 0,
          data: {
            msg: 'success',
            created: created.toJSON(),
          },
        });
      });
    }
  );
};

export const updateKeySetting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('id', 'id is required.').notEmpty().run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return next(errors);
  }
  const { id, ...data } = req.body;
  KeySetting.updateOne({ _id: id }, data, (err, keySetting: KeyDocument) => {
    if (err) {
      return next(err);
    }
    console.log('update keySetting', keySetting);
    res.json({
      code: 0,
      data: {
        msg: 'success',
      },
    });
  });
};

export const removeKeySetting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('id', 'id is required.').notEmpty().run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return next(errors);
  }

  KeySetting.findByIdAndRemove(req.body.id, (err, keySetting: KeyDocument) => {
    if (err) return next(err);
    res.json({
      code: 0,
      data: {
        msg: 'deleted',
        id: keySetting.toJSON()._id,
      },
    });
  });
};

export const getKeySettingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await KeySetting.findOne({ _id: req.params.id }, (err) => {
    if (err) {
      return next(err);
    }
  });
  res.json({
    code: 0,
    data: {
      msg: 'getKeySettingById',
      id: req.params.id,
      key: result.toJSON(),
    },
  });
};
