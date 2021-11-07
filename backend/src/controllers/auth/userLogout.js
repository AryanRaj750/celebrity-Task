import {accessToken} from '../../models';
import { catchAsync } from '../../utils';


const logout = catchAsync(
    async (req, res, next) =>{
        // validation
        const { access_token } = req.headers;
        try {
            await accessToken.deleteOne({ accessToken: access_token });

        } catch (err) {
            return next(new Error('Something went wrong in the database'));
        }
        res.json({ status: "success", message: "successfully logout" });
    }
)
export default logout;