import fs from 'fs';
import path from 'path';

const linksFile = 'd:/echo-social6/echo-social/cloudinary_links.txt';
const outputFile = 'd:/echo-social6/echo-social/src/utils/assetMapping.js';

const content = fs.readFileSync(linksFile, 'utf8');
const lines = content.split('\n');

const assets = {};
let currentFolder = '';

lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    // Detect folder headers
    if (line.endsWith('/') && !line.startsWith('http')) {
        currentFolder = line.replace(/\/$/, ''); // remove trailing slash
        return;
    }

    if (!line.startsWith('http')) return;

    // Extract type (image/video) and public ID with version
    // Example: https://res.cloudinary.com/dzztvmnz1/video/upload/v1770912761/CA1_lg4nfo.mp4

    // Regex matches: .../upload/(v<digits>/)?(.+)
    const match = line.match(/\/upload\/(?:v\d+\/)?(.+)$/);
    if (!match) return;

    const fullPublicId = match[1]; // e.g., CA1_lg4nfo.mp4

    // Identify filename parts
    const filenameWithSuffix = fullPublicId.split('/').pop();

    // Remove extension
    const dotIndex = filenameWithSuffix.lastIndexOf('.');
    const ext = filenameWithSuffix.substring(dotIndex);
    const nameWithoutExt = filenameWithSuffix.substring(0, dotIndex); // CA1_lg4nfo

    // Remove suffix (assuming suffix follows last underscore)
    const lastUnderscoreIndex = nameWithoutExt.lastIndexOf('_');
    let originalName = nameWithoutExt;
    if (lastUnderscoreIndex !== -1) {
        originalName = nameWithoutExt.substring(0, lastUnderscoreIndex);
    }

    // Determine Key based on currentFolder or type
    let key;

    // Special handling for known folders to match codebase usage
    if (currentFolder === 'echosocial-videos') {
        key = `videos/${originalName}${ext}`;
    } else if (['amit', 'falguni', 'salim', 'sanam', 'personal'].includes(currentFolder)) {
        key = `assets/${currentFolder}/${originalName}${ext}`;
    } else if (currentFolder === 'whitford_grid') {
        key = `whitford_grid/${originalName}${ext}`;
    } else if (currentFolder === 'thumbnails') {
        key = `thumbnails/${originalName}${ext}`;
    } else {
        // Fallback
        key = `${currentFolder ? currentFolder + '/' : ''}${originalName}${ext}`;
    }

    assets[key] = fullPublicId;
});

const fileContent = `/**
 * Mapping of local asset paths (conceptual) to Cloudinary Public IDs.
 * Generated automatically from cloudinary_links.txt.
 */
export const ASSET_MAP = ${JSON.stringify(assets, null, 4)};

export const getAssetPath = (path) => {
    // Navigate path: e.g. "/whitford_grid/g1_1.jpg" -> "whitford_grid/g1_1.jpg"
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // Try exact match
    if (ASSET_MAP[cleanPath]) return ASSET_MAP[cleanPath];
    
    // Try matching without leading assets/ if fails
    // (e.g. if code requests "personal/p_1.jpg" but key is "assets/personal/p_1.jpg" OR vice versa)
    // Actually, let's just stick to exact match first.
    
    return null;
};
`;

fs.writeFileSync(outputFile, fileContent);
console.log('Generated assetMapping.js with ' + Object.keys(assets).length + ' entries.');
