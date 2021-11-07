import { catchAsync } from '../../utils';
import { User } from '../../models';
import { CustomErrorHandler } from '../../services';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const resetPassword = catchAsync(
    async (req, res, next) => {
        const { password, newPassword, confirmPassword } = req.body;
        console.log(req.body)
        const { _id } = req.user;
        try {

            const signSchema = Joi.object({
                password: Joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')).required(),
                newPassword: Joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')).required(),
                confirmPassword: Joi.ref('newPassword')
            });

            const { error } = signSchema.validate({ password, newPassword, confirmPassword });

            if (error) {
                // console.log(error)
                return next(CustomErrorHandler.invalidPasswordPattern());
            }
        } catch (err) {
            return next(err)
        }

        let result;
        let matched;
        try {
            result = await User.findOne({ _id });
            if (!result) {
                return next(CustomErrorHandler.emailNotExist('user does not found'));
            }
            else {
                matched = bcrypt.compare(password, result.password)
                if (!matched) {
                    return next(CustomErrorHandler.wrongPassword());
                }
            }
            const hashedPasswd = await bcrypt.hash(newPassword, 10);
            result.password = hashedPasswd;
            await result.save()

        } catch (err) {
            console.log(err);
            return next(err)
        }
        res.status(201).json({ status: "success", message: "password reset successfully" });
    }
)

export default resetPassword;