import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";

export default function EditableImage({ link, setLink }) {
  const [isUploading, setIsUploading] = useState(false); // Handle loading state

  const handleFileChange = async (ev) => {
    const files = ev.target.files;

    if (files?.length === 1) {
      setIsUploading(true); // Show loading state
      const data = new FormData();
      data.set('file', files[0]);

      try {
        // Upload to backend API
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Upload failed.');
        }

        // Set the Cloudinary URL to state
        setLink(result.url);

        toast.success('Upload completed!');
      } catch (error) {
        console.error('Upload error:', error.message);
        toast.error('Upload error!');
      } finally {
        setIsUploading(false); // Hide loading state
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {link ? (
          <Image
            className="rounded-lg mb-1"
            src={link}
            alt="Uploaded Image"
            width={300}
            height={300}
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg mb-1">
            No Image
          </div>
        )}

        <label>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <span className="border border-gray-300 rounded-lg p-2 text-center block cursor-pointer">
            {isUploading ? 'Uploading...' : 'Edit'}
          </span>
        </label>
      </div>
    </>
  );
}
