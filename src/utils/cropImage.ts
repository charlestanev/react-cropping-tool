export async function cropImage(
    imageSrc: string,
    croppedAreaPixels: { x: number; y: number; width: number; height: number },
    padding: number
): Promise<Blob | null> {
    const image = await createImage(imageSrc);

    // First crop the image to the selected area
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = croppedAreaPixels.width;
    tempCanvas.height = croppedAreaPixels.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) {
        console.error('Failed to get temporary canvas context');
        return null;
    }

    tempCtx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
    );

    // Then create a padded canvas and draw the cropped image centered
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = croppedAreaPixels.width + padding * 2;
    finalCanvas.height = croppedAreaPixels.height + padding * 2;
    const finalCtx = finalCanvas.getContext('2d');

    if (!finalCtx) {
        console.error('Failed to get final canvas context');
        return null;
    }

    finalCtx.drawImage(
        tempCanvas,
        padding,
        padding
    );

    return new Promise((resolve) => {
        finalCanvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                console.error('Failed to create blob from final canvas');
                resolve(null);
            }
        }, 'image/png');
    });
}

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
    });
}
