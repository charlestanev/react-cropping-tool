import React from 'react';

interface DownloadButtonProps {
    croppedBlob: Blob | null;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ croppedBlob }) => {
    // Triggers image download when the button is clicked
    const handleDownload = () => {
        if (!croppedBlob) {
            alert('No cropped image to download.');
            return;
        }

        const url = URL.createObjectURL(croppedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cropped-image.png';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleDownload}
            className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
            Download Cropped Image
        </button>
    );
};

export default DownloadButton;
