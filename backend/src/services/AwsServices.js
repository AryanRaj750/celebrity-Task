import aws from "aws-sdk";
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY, AWS_S3_REGION, AWS_S3_BUCKET } from '../config';

// aws account configuring
const s3 = new aws.S3({
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY,
    region: AWS_S3_REGION
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG, PNG and PDF is allowed!"), false);
    }
  };
class AwsS3 {

    static async uploadImage(docName, bucketName = AWS_S3_BUCKET) {
        return multer({
            fileFilter,
            storage: multerS3({
                s3,
                bucket: bucketName,
                metadata: function (req, file, cb) {
                    cb(null, { fieldName: file.fieldname });

                },
                key: function (req, file, cb) {
                    const name = docName + file.originalname;
                    // console.log(name);
                    cb(null, name);
                },
                ACL: 'public-read'
            }),
            limits: {
                fileSize: 1000000
            }

        });
    }
    static async deleteImage(profileUrl) {
        return s3.deleteObject({ Bucket: AWS_S3_BUCKET, Key: profileUrl })
    }
}


// const uploadToS3 =

// const deleteFromS3 = async (profileUrl) => {
//     return await s3.deleteObject().promise();
// }



export default AwsS3;