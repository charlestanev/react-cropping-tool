import React from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadProps {
    onImageSelected: (file: File) => void;
}

const Upload: React.FC<UploadProps> = ({ onImageSelected }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                onImageSelected(acceptedFiles[0]);
            }
        },
    });

    return (
        // Upload dropzone wrapper
        <div
            {...getRootProps()}
            className="p-10 m-8 text-center transition border-2 border-gray-400 border-dashed rounded-lg cursor-pointer hover:border-blue-400"
        >
            <input {...getInputProps()} />
            <p className="text-gray-600">Drag & drop an image here, or click to select</p>
        </div>
    );
};

export default Upload;
