import React from 'react';

interface ZoomSliderProps {
    zoom: number;
    onChange: (value: number) => void;
}

const ZoomSlider: React.FC<ZoomSliderProps> = ({ zoom, onChange }) => {
    return (
        // Zoom control slider
        <div className="flex items-center w-full max-w-sm gap-3 px-2 mt-2 mb-0">
            <label htmlFor="zoom" className="text-sm text-gray-300 whitespace-nowrap">
                Zoom
            </label>
            <input
                id="zoom"
                type="range"
                min={1}
                max={5}
                step="0.01"
                value={zoom}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-full appearance-none cursor-pointer"
            />
        </div>
    );
};

export default ZoomSlider;
