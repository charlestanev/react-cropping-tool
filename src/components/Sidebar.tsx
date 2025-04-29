import React from 'react';
import { cropStyles } from '../utils/cropStyles';
import { Crop, Upload, Download } from 'lucide-react';

interface SidebarProps {
    selectedStyle: keyof typeof cropStyles;
    croppedBlob: Blob | null;
    showCropper: boolean;
    onStyleChange: (style: keyof typeof cropStyles) => void;
    onConfirmCrop: () => void;
    onReset: () => void;
    onDownload: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    selectedStyle,
    croppedBlob,
    showCropper,
    onStyleChange,
    onConfirmCrop,
    onReset,
    onDownload,
}) => {
    return (
        <div className="flex flex-col justify-between h-full p-4 text-gray-200">
            {/* Crop style selector */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-400">Select Crop Style</label>
                <select
                    value={selectedStyle}
                    onChange={(e) => onStyleChange(e.target.value as keyof typeof cropStyles)}
                    className="w-full p-2 text-sm bg-[#1E1E1E] border border-gray-600 rounded"
                >
                    {Object.entries(cropStyles).map(([styleName, styleData]) => (
                        <option key={styleName} value={styleName}>
                            {styleName} (padding: {styleData.padding}px)
                        </option>
                    ))}
                </select>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col mt-6 space-y-3">
                {showCropper && (
                    <button
                        onClick={onConfirmCrop}
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700"
                    >
                        <Crop className="w-4 h-4 mr-2" /> Confirm Crop
                    </button>
                )}

                <button
                    onClick={onReset}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700"
                >
                    <Upload className="w-4 h-4 mr-2" /> Upload Another Image
                </button>

                {croppedBlob && (
                    <button
                        onClick={onDownload}
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        <Download className="w-4 h-4 mr-2" /> Download Cropped Image
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
