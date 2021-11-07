import { catchAsync } from "../utils";
import { Respondent } from "../models";
// import { CustomErrorHandler } from "../services";
import Joi from "joi";
import { CustomErrorHandler } from "../services";

const feedback = catchAsync(async (req, res, next) => {
    const { _id, userType } = req.user;

    if (userType == "respondent") {
        const { feedData } = req.body;
        const today = new Date();
        console.log(userType, feedData)
        let curDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()-1}`
        console.log(curDate, feedData.lastDate);
        const dataValidation = Joi.object({
            feedData: Joi.object().required(),
            surveyName: Joi.string().required(),
            today: Joi.date().less(feedData.lastDate),
        });
        // console.log(curDate, feedData.lastDate)
        const { error } = dataValidation.validate({
            feedData: feedData,
            surveyName: feedData.surveyName,
            today: curDate,
        });
        if (error) {
            console.log(error)
            if(`${error.message}`.includes("today") ){
                return next(CustomErrorHandler.customError("Sorry, Date has been expired"))
            }
            return next(error);
        }

        try {
            console.log("ok")
            const result = await Respondent.findOne({ $and: [{ _id }, { 'respond.surveyName': feedData.surveyName }] })
            console.log("ok1")
            if (result) {
               return res.status(200).json({ status: "fail", message: "only one time allowed to give feedback." })
            }
            console.log("o1")
            await Respondent.updateOne({ _id }, { $addToSet: { respond: feedData } })

        } catch (err) {
            console.log(err)
            return next(err);
        }

    } else {
        return next(CustomErrorHandler.unAuthorized());
    }

    res.status(200).json({ status: "success", message: "Thanks, for giving you valuable time." })

});
export default feedback;
