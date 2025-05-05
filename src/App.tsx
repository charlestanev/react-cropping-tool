import React, { useState, useEffect, useCallback } from 'react';
import { Area } from 'react-easy-crop';
import Upload from './components/Upload';
import CropArea from './components/CropArea';
import Sidebar from './components/Sidebar';
import PreviewArea from './components/PreviewArea';
import { cropImage } from './utils/cropImage';
import { cropStyles } from './utils/cropStyles';
import { Toaster, toast } from 'react-hot-toast';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<keyof typeof cropStyles>('Porcelain Shop');
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(true);

  // Generate a temporary object URL for the uploaded file
  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  // Handles cropping and creates the cropped image blob
  const handleCrop = useCallback(async () => {
    if (!croppedAreaPixels || !selectedFile || !imageUrl) {
      toast.error('Please adjust your crop first!');
      return;
    }

    const padding = cropStyles[selectedStyle].padding;
    const blob = await cropImage(imageUrl, croppedAreaPixels, padding);

    if (blob) {
      setCroppedBlob(blob);
      setShowCropper(false);
      toast.success('Image cropped successfully!');
    } else {
      toast.error('Failed to crop image.');
    }
  }, [croppedAreaPixels, selectedFile, imageUrl]);

  // Resets all state to initial values
  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setImageUrl(null);
    setCroppedAreaPixels(null);
    setCroppedBlob(null);
    setSelectedStyle('Porcelain Shop');
    setZoom(1);
    setShowCropper(true);
    toast('Ready for a new upload!', { icon: '🔄' });
  }, []);

  // Triggers download of the cropped image
  const handleDownload = useCallback(() => {
    if (!croppedBlob) return;
    const url = URL.createObjectURL(croppedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cropped-image.png';
    a.click();
    URL.revokeObjectURL(url);
    handleReset();
  }, [croppedBlob, handleReset]);

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white overflow-hidden">
      <Toaster position="top-right" />

      {!selectedFile ? (
        <Upload onImageSelected={setSelectedFile} />
      ) : (
        <div className="flex flex-col max-h-screen min-h-screen overflow-hidden md:flex-row">
          {/* Sidebar with crop style and action buttons */}
          <div className="w-full md:w-1/3 bg-[#2B2B2B] flex flex-col justify-between p-4">
            <Sidebar
              selectedStyle={selectedStyle}
              croppedBlob={croppedBlob}
              showCropper={showCropper}
              onStyleChange={setSelectedStyle}
              onConfirmCrop={handleCrop}
              onReset={handleReset}
              onDownload={handleDownload}
            />
          </div>

          {/* Main area: Cropper or Preview depending on state */}
          <div className="flex items-start justify-center w-full px-4 py-4 overflow-visible md:w-2/3 md:px-0">
            <div className="w-full max-w-[1280px] m-auto">
              {showCropper && imageUrl ? (
                <CropArea
                  imageUrl={imageUrl}
                  cropStyleName={selectedStyle}
                  onCropComplete={setCroppedAreaPixels}
                  zoomValue={zoom}
                  onZoomChange={setZoom}
                />
              ) : (
                <PreviewArea croppedBlob={croppedBlob} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
