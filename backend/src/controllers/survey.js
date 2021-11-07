import { catchAsync } from "../utils";
import { Coordinator } from "../models";
import { CustomErrorHandler } from "../services";
import Joi from "joi";

const survey = catchAsync(async (req, res, next) => {
    const { _id, userType } = req.user;

    if (userType == 'coordinator') {

        let { surveyData } = req.body;
        const surveyName = surveyData.surveyName;
        const lastDate = surveyData.lastDate;

        const dataValidation = Joi.object({
            surveyData: Joi.object().required(),
            surveyName: Joi.string().required(),
            lastDate: Joi.date().required()
        })
        const { error } = dataValidation.validate({ surveyData, surveyName, lastDate });
        if (error) {
            console.log(error)
            return next(error)
        }

        try {
            await Coordinator.updateOne({ _id }, { "$addToSet": { surveys: surveyData } })

        } catch (err) {
            console.log(err)
            return next(err)
        }
        res.status(200).json({ status: "success", message: "survey created", })

    } else {
        res.status(500).json({ status: "fail", message: "you are unauthorized user", })
    }

})
export default survey;