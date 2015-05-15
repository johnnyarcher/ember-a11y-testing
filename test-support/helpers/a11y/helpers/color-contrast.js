/**
 * Reference: http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
 *            http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html
 * Normal Text ratio of 4.5:1
 * Large Scale Text ratio of 3:1
 * Large Scale Text: 18px or 14px with bold
 *
 * Text or images of text that are part of an inactive user interface component,
 * that are pure decoration, that are not visible to anyone, or that are part of
 * a picture that contains significant other visual content, have no contrast
 * requirement.
 *
 * Text that is part of a logo or brand name has no minimum contrast requirement.
 */


/**
 * Reference: http://www.w3.org/TR/WCAG20/#contrast-ratiodef
 * @param {Number} l1 - Relative luminance of the lighter color
 * @param {Number} l2 - Relative luminance of the darker color
 * @return {Number} - Has a range of [1, 21]
 */
function contrastRatio(l1, l2) {
  let lighter = Math.max(l1, l2);
  let darker = Math.min(l1, l2);

  let numerator = lighter + 0.05;
  let denominator = darker + 0.05;

  return numerator / denominator;
}

/**
 * Compute the relative luminance of a color given it's normalized RGB values
 * Reference: http://www.w3.org/TR/WCAG20/relative-luminance.xml
 * @param {Array}
 * @return {Number}
 */
function relativeLuminance([r, g, b]) {
  let rs = 0.2126 * r;
  let gs = 0.7152 * g;
  let bs = 0.0722 * b;

  return rs + gs + bs;
}

/**
 * Normalize an array of RGB values into a scale of [0, 1]
 * @param {Array}
 * @return {Array}
 */
function normalizeColor([r, g, b]) {
  let rn = r / 255;
  let gn = g / 255;
  let bn = b / 255;

  return [rn, gn, bn];
}

/**
 * Convert various color representations to an array of RGB values
 * @param {String} color
 * @return {Array}
 */
const toRGB = {
  hex(color) {
    let chunkLength = color.length === 4 ? 1 : 2;

    let r = parseInt(color.substr(1, chunkLength), 16);
    let g = parseInt(color.substr(1 + chunkLength, chunkLength), 16);
    let b = parseInt(color.substr(1 + chunkLength * 2, chunkLength), 16);

    return [r, g, b];
  }
}

/**
 * Checks the contrast between a text element and it's background element
 * @param {Object} app - Not used
 * @param {HTMLElement} text
 * @param {HTMLElement} background (optional)
 * @return {Number} 
 */
export function checkTextContrast(app, text, background=text) {
  let foregroundRGB = toRGB.hex(text.style.color);
  let backgroundRGB = toRGB.hex(background.style.backgroundColor);

  let normalColorFG = normalizeColor(foregroundRGB);
  let normalColorBG = normalizeColor(backgroundRGB);

  let l1 = relativeLuminance(normalColorFG);
  let l2 = relativeLuminance(normalColorBG);

  let ratio = contrastRatio(l1, l2);
  
  return ratio;
}