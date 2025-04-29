import React from 'react';

interface CropOverlayProps {
    padding: number;
}

const CropOverlay: React.FC<CropOverlayProps> = ({ padding }) => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Highlight top padding area */}
            <div
                className="absolute bg-cyan-400/20"
                style={{ top: 0, left: 0, right: 0, height: `${padding}px` }}
            />

            {/* Highlight bottom padding area */}
            <div
                className="absolute bg-cyan-400/20"
                style={{ bottom: 0, left: 0, right: 0, height: `${padding}px` }}
            />

            {/* Highlight left padding area */}
            <div
                className="absolute bg-cyan-400/20"
                style={{ top: `${padding}px`, bottom: `${padding}px`, left: 0, width: `${padding}px` }}
            />

            {/* Highlight right padding area */}
            <div
                className="absolute bg-cyan-400/20"
                style={{ top: `${padding}px`, bottom: `${padding}px`, right: 0, width: `${padding}px` }}
            />
        </div>
    );
};

export default CropOverlay;
