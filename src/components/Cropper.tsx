import React, { useEffect, useState } from 'react';
import CropperReact from 'react-easy-crop';
import { cropStyles } from '../utils/cropStyles';
import CropHandles from './CropHandles';
import CropOverlay from './CropOverlay';
import '../styles/cropper-custom.scss';

interface CropperProps {
    imageUrl: string;
    cropStyleName: keyof typeof cropStyles;
    onCropComplete: (croppedAreaPixels: any) => void;
    zoomValue: number;
    onZoomChange: (value: number) => void;
}

const Cropper: React.FC<CropperProps> = ({
    imageUrl,
    cropStyleName,
    onCropComplete,
    zoomValue,
    onZoomChange,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
    const [scale, setScale] = useState(1);

    const padding = cropStyles[cropStyleName].padding;

    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [safeZoneSize, setSafeZoneSize] = useState({ width: 0, height: 0 });

    // Load image and calculate its size along with padded container dimensions
    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            setImageSize({ width, height });
            setContainerSize({
                width: width + padding * 2,
                height: height + padding * 2,
            });
            setSafeZoneSize({ width, height });
        };
    }, [imageUrl, padding]);

    // Dynamically scale the crop area to fit within the viewport
    useEffect(() => {
        const handleResize = () => {
            const availableWidth = window.innerWidth * 0.9;
            const availableHeight = window.innerHeight - 200;

            const widthScale = availableWidth / containerSize.width;
            const heightScale = availableHeight / containerSize.height;

            const finalScale = Math.min(widthScale, heightScale, 1);
            setScale(finalScale);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [containerSize.width, containerSize.height]);

    if (!imageSize) {
        return <div className="mt-10 text-center text-gray-300">Loading image...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div
                className="relative bg-[#2B2B2B] rounded-lg shadow-lg"
                style={{
                    width: `${containerSize.width}px`,
                    height: `${containerSize.height}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                }}
            >
                <CropperReact
                    image={imageUrl}
                    crop={crop}
                    zoom={zoomValue}
                    onCropChange={setCrop}
                    onZoomChange={onZoomChange}
                    onCropComplete={(_, croppedAreaPixels) => onCropComplete(croppedAreaPixels)}
                    cropSize={safeZoneSize}
                    cropShape="rect"
                    showGrid={true}
                    restrictPosition={true}
                />

                {/* Padding overlay for visual guidance */}
                <CropOverlay padding={padding} />

                {/* Circular handles at edges and corners */}
                <CropHandles padding={padding} />
            </div>
        </div>
    );
};

export default Cropper;
