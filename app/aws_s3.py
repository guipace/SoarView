import boto3
import botocore
import urllib
from datetime import datetime
from .config import Config

ALLOWED_EXTENSIONS = {'igc', 'png', 'jpg', 'jpeg', 'gif', 'tiff', 'jfif'}

s3 = boto3.client(
    "s3",
    aws_access_key_id=Config.S3_KEY,
    aws_secret_access_key=Config.S3_SECRET
)


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file_to_s3(file, bucket_name, acl="public-read"):

    try:
        if not allowed_file(file.filename):
            raise Exception('File type is not accepted')
    except Exception as e:
        print("Something Happened: ", e)
        return e

    filename_no_spaces = file.filename.replace(" ", "")
    filename = f"{filename_no_spaces}-{datetime.now().strftime('%Y%m%d%H%M%S%f')}"

    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e

    return f"{Config.S3_LOCATION}{filename}"
