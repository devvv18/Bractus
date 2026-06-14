/**
 * Logo Configuration File
 * 
 * You can configure the website logo here to easily replace it.
 * Supports both text-based logos (with a letter icon) and image-based logos (PNG, SVG, etc.).
 */
export const logoConfig = {
  // Choose either 'text' or 'image'
  type: 'text', 

  // --- Image Logo Settings ---
  // Path to your logo image file (should be placed in the public/ folder, e.g. public/logo.svg)
  imageSrc: '/logo.svg', 
  imageWidth: 36,
  imageHeight: 36,

  // --- Text Logo Settings ---
  letter: 'B',       // The single letter or character shown inside the colored square
  text: 'BRACTUS',   // The text brand name displayed next to the square

  // --- General Settings ---
  showText: true,    // Whether to display the text next to the logo icon
};
