import express from 'express';
import aws from 'aws-sdk';
import isAuthenticated from '../middleware/auth.js';

const awsRouter = express.Router();

aws.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION
});

    const s3 = new aws.S3({
        region: "eu-north-1",
    });


awsRouter.post('/presigned-url', isAuthenticated,  async(req, res) => {

    try {
        const { fileType } = req.body
        
        const {_id} = req.user;
        const extension = fileType.split('/')[1];
        const key = `users/${_id}/${Date.now()}.${extension}`;  //key is like filename or path

        const Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Expires: 120,
            ContentType: fileType
        };
        
        const url = await s3.getSignedUrlPromise(
            "putObject", Params
        );

        const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
        res.status(200).json({ url, imageUrl });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong"});
    }

});

export default awsRouter;