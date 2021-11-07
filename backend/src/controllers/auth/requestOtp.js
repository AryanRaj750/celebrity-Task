import { OtpService, CustomErrorHandler } from "../../services";
import { catchAsync } from "../../utils";
import { User, OTP } from '../../models';
import Joi from "joi";

const requestOtp = catchAsync(
    async (req, res, next) => {
        let { email } = req.body;

        const signSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        })
        const { error } = signSchema.validate({ email });
        if (error) {
            console.log(err)
            return res.json(CustomErrorHandler.invalidEmailPattern())
        }

        try {
            const result = await User.findOne({ email });
            if (!result) {
                return res.json(CustomErrorHandler.emailNotExist());
            }

            try {
                await OTP.deleteOne({ _id: result._id });
                const otp = OtpService.generateOtp();
                await OtpService.sendOtpToEmail(email, otp).then(console.log(`otp sent to ${email}`));
                await OTP.create({ _id: result._id, otp });

            } catch (err) {
                console.log(err)
                return res.json(err);
            }

        } catch (err) {
            console.log(err)
            return res.json(err)
        }
        res.json({ status: "success", message: `otp has been sent on ${email}` })

    }
)
export default requestOtp;