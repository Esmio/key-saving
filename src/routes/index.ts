import passport from 'passport';
import {Router} from 'express';
export const router = Router();

// Controllers (route handlers)
import * as homeController from '../controllers/home';
import * as userController from '../controllers/user';
import * as apiController from '../controllers/api';
import * as contactController from '../controllers/contact';

import * as passportConfig from '../config/passport';

import apiRouter from './api';

/**
 * Primary router routes.
 */
router.get('/', homeController.index);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout);
router.get('/forgot', userController.getForgot);
router.post('/forgot', userController.postForgot);
router.get('/reset/:token', userController.getReset);
router.post('/reset/:token', userController.postReset);
router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);
router.get('/contact', contactController.getContact);
router.post('/contact', contactController.postContact);
router.get('/account', passportConfig.isAuthenticated, userController.getAccount);
router.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
router.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
router.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
router.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * API examples routes.
 */
// router.get('/api', apiController.getApi);
// router.get('/api/facebook', apiController.getFacebook);
router.use('/api', apiRouter);
/**
 * OAuth authentication routes. (Sign in)
 */
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.redirect(req.session.returnTo || '/');
});

export default router;
