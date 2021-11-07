import { catchAsync } from "../../utils";
import { Coordinator, Respondent } from "../../models";
import { S3 } from "../../services";
import Joi from "joi";

const uploadImage = catchAsync(async (req, res, next) => {
  const { _id, userType } = req.user;
  // console.log(req.body);
  // const signSchema = Joi.object({
  //   image: Joi.file().required()
  // });
  // console.log(req.body.image);
  // const { error } = signSchema.validate(req.body.image);

  // if (error) {
  //   console.log(error)
  //   return next(CustomErrorHandler.customError(error));
  // }


  let docName = userType + "/" + _id + "/" + Date.now() + "/";

  let db = Respondent;
  if (userType == 'coordinator') {
    db = Coordinator;

  }

  const singleUpload = (await S3.uploadImage(docName)).single("image");
  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
    let update;
    update = { profileImage: req.file.location };
    db
      .findByIdAndUpdate(_id, update, { new: true })
      .then((user) => res.status(200).json({ success: true, user: user }))
      .catch((err) => res.status(400).json({ success: false, error: err }));
  });

  // res.json({ status: "success", message: "profile image succesfully updated" })
}
);
export default uploadImage;
