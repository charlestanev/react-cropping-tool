import React from 'react';

interface PreviewAreaProps {
    croppedBlob: Blob | null;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ croppedBlob }) => {
    // Don't render anything if there's no cropped image
    if (!croppedBlob) return null;

    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-semibold text-white m-14">Preview:</h2>
            <img
                src={URL.createObjectURL(croppedBlob)}
                alt="Cropped Preview"
                className="max-w-xs border-2 border-gray-400 rounded-lg shadow"
            />
        </div>
    );
};

export default PreviewArea;
