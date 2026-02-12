export const CLOUD_NAME = 'dzztvmnz1';
export const BASE_IMAGE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
export const BASE_VIDEO_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;

/**
 * Generates a Cloudinary URL with auto format and quality optimization.
 * @param {string} publicId - The public ID of the asset (including folder path).
 * @param {string} type - 'image' or 'video'. Defaults to 'image'.
 * @returns {string} The full Cloudinary URL.
 */
export const getCloudinaryUrl = (publicId, type = 'image') => {
    if (!publicId) return '';
    const baseUrl = type === 'video' ? BASE_VIDEO_URL : BASE_IMAGE_URL;
    // Add f_auto,q_auto for optimization
    return `${baseUrl}/f_auto,q_auto/${publicId}`;
};

export const getCloudinaryVideoUrl = (publicId) => {
    return getCloudinaryUrl(publicId, 'video');
};
