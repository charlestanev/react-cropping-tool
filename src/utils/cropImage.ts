// Crops the image based on the provided pixel area and returns it as a PNG blob
export async function cropImage(
    imageSrc: string,
    croppedAreaPixels: { x: number; y: number; width: number; height: number },
): Promise<Blob | null> {
    const image = await createImage(imageSrc);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('Failed to get canvas context');
        return null;
    }

    // Set canvas dimensions to match the cropping area
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    // Draw the specified crop area from the original image onto the canvas
    ctx.drawImage(
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

    // Convert canvas content to a blob and return it
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                console.error('Failed to create blob from canvas');
                resolve(null);
            }
        }, 'image/png');
    });
}

// Loads an image from a given URL and resolves when it's ready
function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous'; // required for working with canvas and CORS images
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
    });
}
