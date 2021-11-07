import { catchAsync } from "../../utils";
import { User, OTP } from "../../models";
import { CustomErrorHandler } from "../../services";
import Joi from "joi";

const verifyContact = catchAsync(async (req, res, next) => {
    let { otp, email } = req.body;
    try {
        const loginSchema = Joi.object({
            otp: Joi.number().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        });
        // ************** validating  email **************
        const { error } = loginSchema.validate({ email, otp });

        if (error) {
            console.log(error);
            return next(CustomErrorHandler.invalidEmailPattern());
        }

    } catch (err) {
        console.log(err)
        return next(err)
    }

    try {
        const result = await User.findOne({ email });
        // console.log(result)
        if (!result) {
            return next(CustomErrorHandler.emailNotExist());
        } else {
            const Token = await OTP.findOne({ $and: [{ _id: result._id }, { otp }] });
            if (!Token) {
                return next(CustomErrorHandler.invalidOtp());
            }
            result.emailVerified = true;
            await result.save();
        }
    } catch (err) {
        console.log(err)
        return next(err);
    }

    res.json({
        status: "success",
        message: `${email} is sucessfully verified`,
    });
});
export default verifyContact;
