import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getPublicIdFromUrl(url: string): string | null {
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;

    const pathAfterUpload = parts[1].replace(/^v\d+\//, '');
    const publicId = pathAfterUpload.substring(0, pathAfterUpload.lastIndexOf('.'));

    return publicId;
  } catch (err) {
    console.error('Error parsing Cloudinary URL:', err);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const publicId = getPublicIdFromUrl(url);

    if (!publicId) {
      return NextResponse.json({ error: 'Invalid Cloudinary URL' }, { status: 400 });
    }

    // Delete Image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    // If Cloudinary couldn't find the publicId, return a 404
    if (result.result === 'not found') {
      return NextResponse.json({ error: 'Asset not found on Cloudinary', publicId }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error('Failed to delete image from Cloudinary:', err);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
