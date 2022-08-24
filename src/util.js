/**
 * Get the inner html for a HTMLElement
 * @param {string} css   classes for the shadow root
 * @param {string} html     html for the shadow root
 * @param {string} html     formatted html with styles
 */
 export const generateHTMLelementInnerHTML = (css, html) => {
  return `
    <style>
      ${css}
    </style>

    ${html}
  `
};
