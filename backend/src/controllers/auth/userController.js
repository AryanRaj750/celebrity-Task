import { Coordinator, Respondent } from '../../models';
import { CustomErrorHandler } from '../../services';
import { catchAsync } from '../../utils';

const userController = catchAsync(
    async (req, res, next) => {

        const { _id, userType } = req.user;
        let result;

        try {
            let db = Respondent;
            if (userType == 'coordinator'){
              db =  Coordinator;

            }
            result = await db.findOne({_id}).select('-__v -_id');

            if (!result) {
                return next(CustomErrorHandler.notFound())
            }

        } catch (err) {
            console.log(err)
            return next(err);
        }
        res.json({status: "success", result});
    }
)

export default userController;