import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "@/lib/actions/user.action";

export async function POST(request: Request) {
  const cookiesRes = await getSession();

  if (!cookiesRes) {
    throw new Error("User could not be authenticated");
  }

  const { contentType, imageId } = await request.json();

  if (!contentType.startsWith("image")) throw new Error("Invalid file type");

  const key = imageId?.split("?")[0] || uuidv4();

  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: `images/${key}`,
      Conditions: [
        ["content-length-range", 0, 3145728],
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        "Content-Type": contentType,
      },
      Expires: 600,
    });

    return Response.json({ url, fields });
  } catch (error) {
    error instanceof Error && console.log(error.message);
    return Response.json({
      status: "Failed",
      message: {
        fieldErrors: {
          profilePic: "Failed to upload image",
        },
      },
    });
  }
}
