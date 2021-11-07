import { catchAsync } from '../../utils';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import { User, OTP, Respondent, Coordinator } from '../../models';
import { CustomErrorHandler } from '../../services';
import { OtpService } from '../../services';

const signup = catchAsync(
    async (req, res) => {

        let { name, email, password, gender, age, userType } = req.body;
        console.log(req.body)
        const signSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')).required(),
            gender: Joi.string().valid("male", "female", "other").required(),
            age: Joi.number().min(16).max(80).required(),
            userType: Joi.string().valid("coordinator", "respondent").required()

        });
        const { error } = signSchema.validate({ name, email, password, gender, age, userType });
        if (error) {
            console.log(error)
            return res.json(CustomErrorHandler.customError(error));
        }

        let userData;
        try {
            email = email.toLowerCase();
            const userExist = await User.exists({ email });
            if (userExist) {
                return res.json(CustomErrorHandler.emailAlreadyExist());
            }
            // password hashing
            const hashedPasswd = await bcrypt.hash(password, 10);
            // data model
            userData = new User({
                email,
                password: hashedPasswd,
                userType: userType.toLowerCase()

            });
            //storing data in user/Authenticaiton database
            try {
                // email, password and userType saving
                const result = await userData.save();
                let db = Respondent;
                if (userType == 'coordinator') {
                    db = Coordinator;

                }
                userData = new db({
                    _id: result._id,
                    name: name.toLowerCase(),
                    gender: gender.toLowerCase(),
                    age,

                });
                await userData.save()

                const otp = OtpService.generateOtp();
                OtpService.sendOtpToEmail(email, otp).then(console.log(`otp sent to ${email}`));
                await OTP.create({ _id: result._id, otp })
            } catch (err) {
                console.log(err)
                return res.json(err)
            }

        } catch (err) {
            console.log(err)
            return res.json(err)
        }
        res.status(201).json({ status: "success", message: `otp has sent to ${email}` })
    }
)

export default signup;