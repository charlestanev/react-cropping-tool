import React from 'react';
import Cropper from './Cropper';
import ZoomSlider from './ZoomSlider';

interface CropAreaProps {
    imageUrl: string;
    cropStyleName: string;
    onCropComplete: (croppedAreaPixels: any) => void;
    zoomValue: number;
    onZoomChange: (value: number) => void;
}

const CropArea: React.FC<CropAreaProps> = ({
    imageUrl,
    cropStyleName,
    onCropComplete,
    zoomValue,
    onZoomChange,
}) => {
    return (
        <div className="flex flex-col items-center w-full max-w-[90vw] md:max-w-full space-y-4">
            <ZoomSlider zoom={zoomValue} onChange={onZoomChange} />
            <Cropper
                imageUrl={imageUrl}
                cropStyleName={cropStyleName as any}
                onCropComplete={onCropComplete}
                zoomValue={zoomValue}
                onZoomChange={onZoomChange}
            />
        </div>
    );
};

export default CropArea;
