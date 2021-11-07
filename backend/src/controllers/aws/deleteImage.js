import { catchAsync } from '../../utils';
import { Respondent, Coordinator } from '../../models';
import { CustomErrorHandler, S3 } from '../../services';


const deleteImage = catchAsync(
    async (req, res, next) => {

        const { _id, userType } = req.user;

        let db = Respondent;
        if ( userType == 'coordinator') {
            db = Coordinator;

        }

        try {
            const result = await db.findOne({ _id });

            if (!result) {
                return next(CustomErrorHandler.unAuthorized())
            }
            const singleDelete = (await S3.deleteImage(result.profileImage));
            result.profileImage = null
            result.save()

        } catch (err) {
            return next(err)
        }
        res.json({ status: "success", message: "profile Image was removed." });
    })
export default deleteImage