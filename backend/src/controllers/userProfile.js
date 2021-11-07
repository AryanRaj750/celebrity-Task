import { catchAsync } from "../utils";
import { Respondent, Coordinator } from "../models";
import { CustomErrorHandler } from "../services";
import Joi from "joi";

const userProfile = catchAsync(async (req, res, next) => {

    let { _id, userType } = req.user;
    const { name, gender, age } = req.body;

    const signSchema = Joi.object({
        name: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,30}$')),
        gender: Joi.string().valid("male", "female", "other"),
        age: join.number().min(16).max(80),

    }).or('name', 'age', 'gender');
    const { error } = signSchema.validate({ name, gender, age });
    if (error) {
        console.log(error)
        return res.json(CustomErrorHandler.customError(error));
    }
    let db = Respondent;
    if (userType == 'coordinator') {
        db = Coordinator;
    }

    try {
        const result = await db.findOne({ _id })
        if (!result) {
            return next(CustomErrorHandler.customError('user does not exist'));
        }
        let userData = {
            name: name.email.toLowerCase(),
            gender: gender.email.toLowerCase(),
            age
        }
        result.save(userData);

    } catch (err) {
        console.log(err)
        return next(err);
    }

    res.json({ status: "success", message: "Profile updated..." });
});

export default userProfile;
