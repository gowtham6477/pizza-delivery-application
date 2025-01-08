import { NextResponse } from 'next/server';
import { promisify } from 'util';
import stream from 'stream';
import cloudinary from '@/utils/cloudinary';

// Promisify stream for uploading to Cloudinary
const pipeline = promisify(stream.pipeline);

export async function POST(req) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // Create a buffer for the file
    const buffer = Buffer.from(await file.arrayBuffer());

    // Prepare the upload stream for Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' }, // Specify folder in Cloudinary
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      const readableStream = stream.Readable.from(buffer);
      readableStream.pipe(uploadStream);
    });

    const result = await uploadPromise;

    // Return Cloudinary URL in the response
    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error.message);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
