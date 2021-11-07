import { catchAsync } from '../../utils';
import { User, accessToken, Respondent, Coordinator } from '../../models'
import { CustomErrorHandler, JwtService } from '../../services';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const login = catchAsync(
    async (req, res) => {
        let { email, password } = req.body;

        const loginSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')).required(),
        })
        // ************** validating  email **************
        const { error } = loginSchema.validate({ email, password });
        if (error) {
            console.log(error)
            return res.json(CustomErrorHandler.customError(error))
        }

        let access_token;
        let result;
        let userInfo;
        try {
            result = await User.findOne({ email });
            if (!result) {
                return res.json(CustomErrorHandler.customError('user does not found'));
            }
            else {
                if (result.accountStatus != 'active') {
                    return res.json(CustomErrorHandler.accountNotActive());
                }
                else {
                    if (result.emailVerified) {
                        // password matching here
                        const passwordMatch = await bcrypt.compare(password, result.password)
                        if (!passwordMatch) {
                            return res.json(CustomErrorHandler.wrongPassword())
                        }
                        access_token = JwtService.sign({ _id: result._id, userType: result.userType });
                        await accessToken.deleteOne({ _id: result._id });
                        await accessToken.create({ _id: result._id, accessToken: access_token });

                        let db;
                        if(result.userType == 'coordinator'){
                            db = Coordinator
                        }
                        else if(result.userType == 'respondent'){
                            db = Respondent
                        }
                        userInfo = await db.findOne({_id: result._id})
                    }
                    else {
                        return res.json(CustomErrorHandler.emailNotVerifeid())
                    }

                }
            }
        } catch (err) {
            console.log(err)
            return res.json(err)
        }

        res.status(200).json({ status: "success", access_token, userType: result.userType, name: userInfo.name })
    }
);

export default login;
