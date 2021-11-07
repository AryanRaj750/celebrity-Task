import express from 'express';
const router = express.Router();
import auth from '../middlewares/auth'
// user auth and image related file imported
import { userProfile, signup, login, logout, userController, requestOtp, updatePhoneNumber, verifyEmail,forgotPassword, resetPassword, uploadImage, deleteImage, survey,updateSurvey, feedback} from '../controllers/';

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verifyemail', verifyEmail);
router.post('/requestotp', requestOtp);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', auth, resetPassword);

router.post('/me',auth, userController);
router.patch('/updatephoneno', auth, updatePhoneNumber);
// image/profileImage related routes
router.route('profileimage')
.put(auth, uploadImage)
.delete( auth, deleteImage);

// survey
router.route('/survey')
.post(auth, survey)
.patch(auth, updateSurvey);

// feedback
router.route('/feedback')
.post(auth, feedback)

router.post('/username', userProfile);





export default router;