import React from 'react';

const handleStyle =
    'w-4 h-4 bg-white rounded-full absolute z-50 border border-gray-800 shadow';

const CropHandles: React.FC<{ padding: number }> = ({ padding }) => (
    <>
        {/* Midpoints on each edge */}
        <div
            className={handleStyle}
            style={{ top: `${padding}px`, left: '50%', transform: 'translate(-50%, -50%)' }}
        />
        <div
            className={handleStyle}
            style={{ bottom: `${padding}px`, left: '50%', transform: 'translate(-50%, 50%)' }}
        />
        <div
            className={handleStyle}
            style={{ top: '50%', left: `${padding}px`, transform: 'translate(-50%, -50%)' }}
        />
        <div
            className={handleStyle}
            style={{ top: '50%', right: `${padding}px`, transform: 'translate(50%, -50%)' }}
        />

        {/* All four corners */}
        <div
            className={handleStyle}
            style={{ top: `${padding}px`, left: `${padding}px`, transform: 'translate(-50%, -50%)' }}
        />
        <div
            className={handleStyle}
            style={{ top: `${padding}px`, right: `${padding}px`, transform: 'translate(50%, -50%)' }}
        />
        <div
            className={handleStyle}
            style={{ bottom: `${padding}px`, left: `${padding}px`, transform: 'translate(-50%, 50%)' }}
        />
        <div
            className={handleStyle}
            style={{ bottom: `${padding}px`, right: `${padding}px`, transform: 'translate(50%, 50%)' }}
        />
    </>
);

export default CropHandles;
