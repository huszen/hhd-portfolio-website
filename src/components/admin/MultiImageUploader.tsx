'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface MultiImageUploaderProps {
  values: string[];
  onChange: (urls: string[] | ((prev: string[]) => string[])) => void;
  maxFiles?: number;
  folder?: string;
  label?: string;
}

export default function MultiImageUploader({ values = [], onChange, maxFiles = 5, folder = 'portfolio', label = 'Upload Screenshots' }: MultiImageUploaderProps) {
  const handleSuccess = (result: any) => {
    const newUrl = result.info?.secure_url;
    if (!newUrl) return;

    // Fix: Functional update guarantees every uploaded image is preserved
    onChange((prevValues) => {
      const current = Array.isArray(prevValues) ? prevValues : values;
      if (current.includes(newUrl)) return current;
      return [...current, newUrl];
    });
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(values.filter((_, idx) => idx !== indexToRemove));
  };

  const remainingFiles = maxFiles - values.length;

  return (
    <div className="space-y-3">
      {label && <label className="block text-sm font-medium text-text-main">{label}</label>}

      {values.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {values.map((url, idx) => (
            <div key={url || idx} className="relative aspect-video rounded-xl overflow-hidden border border-border-main bg-bg-main group">
              <Image src={url} alt={`Screenshot ${idx + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button type="button" onClick={() => handleRemove(idx)} className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition cursor-pointer" title="Remove image">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {values.length < maxFiles && (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            folder,
            multiple: true,
            maxFiles: remainingFiles,
            resourceType: 'image',
          }}
          onSuccess={handleSuccess}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full border-2 border-dashed border-border-main hover:border-primary rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-bg-main/50 hover:bg-bg-main transition text-text-muted hover:text-primary cursor-pointer"
            >
              <ImagePlus className="w-6 h-6" />

              <div className="text-center">
                <p className="text-xs font-medium">Click to upload images</p>

                <p className="text-[11px] text-text-muted mt-0.5">
                  Multi-select enabled (Maximum {maxFiles} images, {remainingFiles} remaining)
                </p>
              </div>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
