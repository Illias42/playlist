import { S3 } from 'aws-sdk';
export declare enum FileType {
    AUDIO = "audio",
    IMAGE = "image"
}
export declare class FileService {
    createFile(type: FileType, file: any): Promise<string>;
    getS3(): S3;
}
