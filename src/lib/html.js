/**
 * Small HTML helpers. Every string rendered on the site passes through here,
 * so escaping is enforced in one place.
 */

const ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escape text for HTML text nodes and attribute values.
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>"']/g, (ch) => ENTITIES[ch]);
}

/**
 * Escape a URL for use in href/src. Rejects javascript: and data: payloads.
 * @param {string} value
 * @returns {string}
 */
export function escapeAttr(value) {
  const str = String(value ?? '').trim();
  if (/^\s*(javascript|data|vbscript):/i.test(str)) return '#';
  return escapeHtml(str);
}

/**
 * Format an ISO timestamp as a human date.
 * @param {string|null|undefined} iso
 * @returns {string}
 */
export function formatDate(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Format an ISO timestamp as YYYY-MM-DD (for <time datetime>).
 * @param {string|null|undefined} iso
 * @returns {string}
 */
export function isoDate(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

/**
 * Render a list of strings as an unordered list.
 * @param {string[]} items
 * @param {string} [className]
 * @returns {string}
 */
export function list(items, className = '') {
  if (!items || items.length === 0) return '';
  const cls = className ? ` class="${escapeAttr(className)}"` : '';
  return `<ul${cls}>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
}

/**
 * Join class names, skipping falsy values.
 * @param {...(string|false|null|undefined)} names
 */
export function cx(...names) {
  return names.filter(Boolean).join(' ');
}

/**
 * Compact whitespace in generated HTML so output is readable in view-source.
 * @param {string} html
 */
export function tidy(html) {
  return html
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
