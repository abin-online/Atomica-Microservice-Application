// import AWS from 'aws-sdk';
// import dotenv from 'dotenv';

// dotenv.config();

// class S3Service {
//   private s3: AWS.S3;

//   constructor() {
//     const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET_NAME } = process.env;

//     if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION || !AWS_BUCKET_NAME) {
//       throw new Error('Missing AWS env variables');
//     }

//     AWS.config.update({
//       accessKeyId: AWS_ACCESS_KEY_ID,
//       secretAccessKey: AWS_SECRET_ACCESS_KEY,
//       region: AWS_REGION,
//     });

//     this.s3 = new AWS.S3();
//   }

//   async uploadFile(file: Express.Multer.File) {
//     const { AWS_BUCKET_NAME } = process.env;

//     if (!AWS_BUCKET_NAME) {
//       throw new Error('AWS_BUCKET_NAME is not env variables');
//     }

//     const params: AWS.S3.PutObjectRequest = {
//       Bucket: AWS_BUCKET_NAME as string,  
//       Key: file.originalname,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//     };

//     try {
//       const data = await this.s3.upload(params).promise();
//       return data;
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       throw new Error("File upload failed");
//     }
//   }
// }

// export default new S3Service();

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET_NAME } = process.env;

    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION || !AWS_BUCKET_NAME) {
      throw new Error("Missing AWS environment variables");
    }

    this.bucketName = AWS_BUCKET_NAME;

    this.s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.bucketName,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const command = new PutObjectCommand(params);
      const response = await this.s3Client.send(command);
      console.log("File uploaded successfully:", response);
      return response;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("File upload failed");
    }
  }
}

export default new S3Service();
