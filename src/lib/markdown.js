/**
 * Minimal Markdown renderer for article bodies.
 * Supports: h2/h3, paragraphs, ordered/unordered lists, blockquotes,
 * fenced code blocks, inline code, bold, italic, and links.
 * Deliberately small — article copy in this repo is under my control.
 */

import { escapeHtml } from './html.js';

/**
 * @param {string} markdown
 * @returns {string} HTML
 */
export function renderMarkdown(markdown) {
  const lines = String(markdown ?? '').replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let index = 0;
  let paragraph = [];
  let listType = null;
  let listItems = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      out.push(
        `<${listType}>${listItems.map((item) => `<li>${inline(item)}</li>`).join('')}</${listType}>`,
      );
      listItems = [];
      listType = null;
    }
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      flushAll();
      const lang = trimmed.slice(3).trim();
      const buffer = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        buffer.push(lines[index]);
        index += 1;
      }
      index += 1;
      const cls = lang ? ` class="language-${escapeHtml(lang)}"` : '';
      out.push(`<pre><code${cls}>${escapeHtml(buffer.join('\n'))}</code></pre>`);
      continue;
    }

    if (!trimmed) {
      flushAll();
      index += 1;
      continue;
    }

    const heading = trimmed.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      const id = slugId(heading[2]);
      out.push(`<h${level} id="${id}">${inline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith('> ')) {
      flushAll();
      const quote = [];
      while (index < lines.length && lines[index].trim().startsWith('> ')) {
        quote.push(lines[index].trim().slice(2));
        index += 1;
      }
      out.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`);
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.*)$/);
    if (unordered) {
      flushParagraph();
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      listItems.push(unordered[1]);
      index += 1;
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.*)$/);
    if (ordered) {
      flushParagraph();
      if (listType && listType !== 'ol') flushList();
      listType = 'ol';
      listItems.push(ordered[1]);
      index += 1;
      continue;
    }

    flushList();
    paragraph.push(trimmed);
    index += 1;
  }

  flushAll();
  return out.join('\n');
}

/**
 * Extract h2/h3 headings for a table of contents.
 * @param {string} markdown
 * @returns {Array<{level: number, text: string, id: string}>}
 */
export function extractHeadings(markdown) {
  return String(markdown ?? '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim().match(/^(#{2,3})\s+(.*)$/))
    .filter(Boolean)
    .map((match) => ({
      level: match[1].length,
      text: match[2].replace(/[*_`]/g, ''),
      id: slugId(match[2]),
    }));
}

/**
 * Approximate reading time in minutes (200 wpm).
 * @param {string} markdown
 * @returns {number}
 */
export function readingTime(markdown) {
  const words = String(markdown ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * @param {string} text
 */
function slugId(text) {
  return String(text)
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Inline formatting. Input is escaped first, then a fixed set of patterns
 * is applied to the escaped text so markup never introduces raw HTML.
 * @param {string} text
 */
function inline(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(^|[\s(])\*([^*]+)\*(?=[\s).,]|$)/g, '$1<em>$2</em>');
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g,
    (_match, label, href) => {
      const external = /^https?:/.test(href);
      return `<a href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`;
    },
  );
  return html;
}
