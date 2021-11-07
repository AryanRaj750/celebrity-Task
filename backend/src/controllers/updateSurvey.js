import { catchAsync } from "../utils";
import { Coordinator } from "../models";
import { CustomErrorHandler } from "../services";
import Joi from "joi";

const survey = catchAsync(async (req, res, next) => {
    const { _id, userType } = req.user;
    console.log(_id, userType)
    if (userType == 'coordinator') {
        console.log("i am coordinator")

        let { surveyData } = req.body;
        const surveyName = surveyData.surveyName;

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
            let docPath = `surveys.$.${surveyData.fieldName}`
            let update = { "$set": { [docPath]: surveyData.value } }
            await Coordinator.updateOne({ $and: [{ _id }, { 'surveys.surveyName': surveyName }] }, update)

        } catch (err) {
            console.log(err)
            return next(err)
        }
    } else {
        return next(CustomErrorHandler.unAuthorized())
    }
    res.status(200).json({ success: true, message: "survey created", })

})
export default survey;