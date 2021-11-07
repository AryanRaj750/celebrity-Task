import { JwtService } from '../services';
import CustomErrorHandler from '../services/CustomErrorHandler';


const auth = async (req, res, next) => {

    let authHeader = req.headers.authorization;
    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized())
    }
    const token  = authHeader.split(' ')[1];
     //console.log(token);
    try {
        const { _id, userType } = await JwtService.verify(token);
        const users = {
            _id,
            userType
        }

        req.user = users;
        next();

    } catch (err) {
        console.log(err);
        return next(CustomErrorHandler.unAuthorized())
    }
}
export default auth;