import { catchAsync } from '../../utils';
import { Respondent, Coordinator } from '../../models';
import Joi from 'joi';
import { CustomErrorHandler } from '../../services';
const addPhoneNumber = catchAsync(
    async (req, res, next) => {

        const { _id, userType } = req.user;
        const phoneNumber = req.query.phoneNumber;
        console.log(phoneNumber)

        const signSchema = Joi.object({
            phoneNumber: Joi.string().pattern(new RegExp('^[0-9+]{3,30}$')).required()
        })

        const { error } = signSchema.validate({ phoneNumber });
        if (error) {
            console.log(error)
            return next(CustomErrorHandler.invalidPhoneNumberPattern())
        }

        let db = Respondent;
        if (userType == 'coordinator') {
            db = Coordinator;

        }
        try {
            const result = await db.findOne({ _id })
            if (!result) {
                return next(CustomErrorHandler.customError('user does not exist.'));
            }
            else {
                if (result.phoneNumber != phoneNumber) {
                    result.phoneNumber = phoneNumber;
                    await result.save();
                }
                else {
                    return next(CustomErrorHandler.customError(`${phoneNumber} already added`))
                }
            }

            // otp = OtpService.generateOtp()
            // OtpService.sendOtpToPhone(phoneNumber, otp)
            // await OTP.create({ userName, otp })

        } catch (err) {
            console.log(err)
            return next(err)
        }
        res.status(201).json({ status: "success", message: ` ${phoneNumber} added.` });
    }
)

export default addPhoneNumber;