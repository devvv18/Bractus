/**
 * Logo Configuration File
 * 
 * You can configure the website logo here to easily replace it.
 * Supports both text-based logos (with a letter icon) and image-based logos (PNG, SVG, etc.).
 */
export const logoConfig = {
  // Choose either 'text' or 'image'
  type: 'image',

  // --- Image Logo Settings ---
  // Path to your logo image file (placed in the public/ folder)
  imageSrc: '/bractus-logo.png',
  imageWidth: 400,   // width in px — full logo with wordmark
  imageHeight: 118,
  imageMarginLeft: -130, // Shift left to align with page margin (cancels transparent border in logo PNG)

  // --- Text Logo Settings (fallback) ---
  letter: 'B',
  text: 'BRACTUS',

  // --- General Settings ---
  // showText false because the image already includes the wordmark
  showText: false,
};
