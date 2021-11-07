class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }
    // if (err) {
    //     return res.json({
    //       success: false,
    //       errors: {
    //         title: "Image Upload Error",
    //         detail: err.message,
    //         error: err,
    //       },
    //     });
    static invalidEmailPattern(message = {
        status: 'fail',
        message: 'Given email pattern does not match. Please enter valid email'
    }) {
        return new CustomErrorHandler(500, message);
    }

    static emailAlreadyExist(message = { status: 'fail', message: 'This email is already used. Try another Email.' }) {
        return new CustomErrorHandler(409, message);
    }
    static emailNotVerifeid(message = { status: 'fail', message: 'First verify your Email Id' }) {
        return new CustomErrorHandler(401, message);
    }
    static emailNotExist(message = { status: 'fail', message: 'Provided email does not exist. Kinldy check your email.' }) {
        return new CustomErrorHandler(401, message);
    }
    static addEmail(message = { status: 'fail', message: 'First add your Email ID' }) {
        return new CustomErrorHandler(401, message);
    }

    // phone number related error/issues or possibilites

    static invalidPhoneNumberPattern(message = { status: 'fail', message: 'Given phone number pattern does not match. Please enter valid Phone Number' }) {
        return new CustomErrorHandler(500, message);
    }

    static phoneNumberAlreadyExist(message = { status: 'fail', message: 'This Phone Number is already used. Try another Phone Number.' }) {
        return new CustomErrorHandler(409, message);
    }

    static phoneNumberNotVerifeid(message = { status: 'fail', message: 'First verify your Phone Number' }) {
        return new CustomErrorHandler(401, message);
    }
    static phoneNumberNotExist(message = { status: 'fail', message: 'Provided Phone Number does not exist. Kinldy check your Phone Number.' }) {
        return new CustomErrorHandler(401, message);
    }
    static phoneNumberNotAdded(message = { status: 'fail', message: 'First add your Phone Number' }) {
        return new CustomErrorHandler(401, message);
    }

    // password related error/issues or possibilites
    static invalidPasswordPattern(message = { status: 'fail', message: 'password shouled be 8 of digit  and atleast contain one uppercase, one lowercase, one integer and one symbol.' }) {
        return new CustomErrorHandler(401, message);
    }
    static wrongPassword(message = { status: 'fail', message: 'Password did not match. Kinldy check your Password.' }) {
        return new CustomErrorHandler(401, message);
    }

    static serverError(message = { status: 'fail', message: 'Internal server error' }) {
        return new CustomErrorHandler(500, message);
    }


    // otp related error/issues or possibilites

    static invalidOtp(message = { status: 'fail', message: 'Token has expired or invalid' }) {
        return new CustomErrorHandler(500, message);
    }
    // file related error/issues or possibilites
    static invalidFileType(message = { status: 'fail', message: 'Invalid file type. Only support .png, .jpg, .jpeg, .gif extension file' }) {
        return new CustomErrorHandler(500, message);
    }
    static fileSizeTooLarge(message = { status: 'fail', message: 'File size maximum can be 1MB 1024KB.' }) {
        return new CustomErrorHandler(500, message);
    }
    static fileNotFound(message = { status: 'fail', message: 'File does not exist' }) {
        return new CustomErrorHandler(500, message);
    }
    // account status

    static contactCannotAdd(message = { status: 'fail', message: 'you are trying to add same contact. please try another contact' }) {
        return new CustomErrorHandler(500, message);
    }
    static unAuthorized(message = { status: 'fail', message: 'It looks like you are unAuthorized user.' }) {
        return new CustomErrorHandler(500, message);
    }

    static accountNotActive(message = { status: 'fail', message: 'This account is deactivated.' }) {
        return new CustomErrorHandler(500, message);
    }
    static customError(message = {
        status: 'fail',
        message: 'Something went wrong'
    }) {
        return new CustomErrorHandler(500, message);
    }

}

export default CustomErrorHandler;
// module.exports = CustomErrorHandler ;