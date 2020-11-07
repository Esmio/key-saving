import Router from 'express';
import * as keySettingRouter from '../controllers/keySetting';

const router = Router();

router.route('/keys')
  .get(keySettingRouter.getKeySetting)
  .post(keySettingRouter.saveKeys)
  .put(keySettingRouter.updateKeySetting)
  .delete(keySettingRouter.removeKeySetting);

router.route('/keys/:id')
  .get(keySettingRouter.getKeySettingById);

export default router;