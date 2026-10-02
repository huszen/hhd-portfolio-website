'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({ value, onChange, onRemove, folder = 'portfolio', label = 'Upload Image' }: ImageUploaderProps) {
  const [deleting, setDeleting] = useState(false);

  const handleSuccess = (result: any) => {
    if (result.info?.secure_url) {
      onChange(result.info.secure_url);
    }
  };

  const handleDelete = async () => {
    if (!value) return;

    setDeleting(true);

    try {
      // call the server API route to delete from cloudinary CDN
      await fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: value }),
      });
    } catch (error) {
      console.error('Failed to delete image from Cloudinary:', error);
    } finally {
      setDeleting(false);
      if (onRemove) {
        onRemove();
      } else {
        onChange('');
      }
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-text-main">{label}</label>}

      {value ? (
        <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-border-main group bg-bg-main">
          <Image src={value} alt="Uploaded Image" fill sizes="160px" className="object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <button type="button" disabled={deleting} onClick={handleDelete} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition cursor-pointer disabled:opacity-50" title="Delete Image">
              {deleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            folder: folder,
            maxFiles: 1,
            resourceType: 'image',
          }}
          onSuccess={handleSuccess}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-40 h-40 rounded-xl border-2 border-dashed border-border-main hover:border-primary bg-bg-main/50 hover:bg-bg-main transition flex flex-col items-center justify-center gap-2 text-text-muted hover:text-primary cursor-pointer"
            >
              <ImagePlus className="w-8 h-8" />
              <span className="text-xs font-medium">Upload Image</span>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
