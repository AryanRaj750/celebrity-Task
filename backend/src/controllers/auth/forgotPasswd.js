import { catchAsync } from '../../utils';
import { User, OTP } from '../../models';
import { CustomErrorHandler } from '../../services';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

const forgotPassword = catchAsync(
    async (req, res, next) => {
        const { email, otp, newPassword } = req.body;

        try {

            const loginSchema = Joi.object({
                otp: Joi.number().required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                newPassword: Joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')).required()
            })
            // ************** validating  email **************
            const { error } = loginSchema.validate({ otp, email, newPassword });
            if (error) {
                console.log(error)
                return next(CustomErrorHandler.invalidEmailPattern())
            }

        } catch (err) {
            console.log(err)
            return next(err)
        }

        let Token;
        try {
            const result = await User.findOne({ email });

            if (!result) {
                return next(CustomErrorHandler.emailNotExist());
            }

            Token = await OTP.findOne({ $and: [{_id: result._id }, { otp }] });
            if (!Token) {
                return next(CustomErrorHandler.invalidOtp());
            }
            const hashedPasswd = await bcrypt.hash(newPassword, 10);
            result.password = hashedPasswd;
            await result.save();

        } catch(err) {
            console.log(err)
            return next(err);
        }
            res.status(201).json({ status: "success", message: "password has been changed successfully" });
        }
)

export default forgotPassword;