/**
 * Get sprite from icons SVG
 * @param {string} id - Human readable icon name, i.e. GitHub
 * @param {string} [size=1em] - Rendered icon height and width
 * @param {string|boolean} [label=false] - Icon label
 * @returns {string} SVG
 */
module.exports = (id, size = '1em', label = false) => label
  ? `<svg width="${size}" height="${size}" focusable="false" aria-labelledby="${id}-title" role="img">
    <title id="${id}-title">${label}</title>
    <use href="/static/vectors/icons.svg#${id}"></use>
  </svg>`
  : `<svg width="${size}" height="${size}" focusable="false" aria-hidden="true">
    <use href="/static/vectors/icons.svg#${id}"></use>
  </svg>`;
