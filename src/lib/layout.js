/**
 * Page shell: header, navigation, footer, and the global floating WhatsApp CTA.
 * Layouts are plain template functions — no framework, no runtime JS required.
 */

import { FOOTER_LINKS, NAV, PRIMARY_CTA, SITE, waLink } from './config.js';
import { escapeAttr, escapeHtml, tidy } from './html.js';
import { renderHead } from './seo.js';

/**
 * @param {{seo: object, body: string, pageClass?: string, activePath?: string, scripts?: string}} options
 * @returns {string} full HTML document
 */
export function renderPage({ seo, body, pageClass = '', activePath = '/', scripts = '' }) {
  return tidy(`<!DOCTYPE html>
<html lang="${SITE.lang}">
<head>
    ${renderHead(seo)}
</head>
<body class="${escapeAttr(pageClass)}">
    <a class="skip-link" href="#main">Skip to content</a>
    ${renderHeader(activePath)}
    <main id="main">
${body}
    </main>
    ${renderFooter()}
    ${renderWhatsAppFab()}
    ${scripts}
</body>
</html>
`);
}

/**
 * @param {string} activePath
 */
export function renderHeader(activePath = '/') {
  const links = NAV.map((item) => {
    const active =
      activePath === item.href || (item.href !== '/' && activePath.startsWith(item.href));
    return `<a class="nav__link${active ? ' is-active' : ''}" href="${escapeAttr(item.href)}"${
      active ? ' aria-current="page"' : ''
    }>${escapeHtml(item.label)}</a>`;
  }).join('');

  return `<header class="site-header" data-header>
      <div class="shell site-header__inner">
        <a class="brand" href="/" aria-label="${escapeAttr(SITE.name)} — home">
          <span class="brand__mark" aria-hidden="true">MH</span>
          <span class="brand__text">
            <span class="brand__name">${escapeHtml(SITE.name)}</span>
            <span class="brand__role">${escapeHtml(SITE.role)}</span>
          </span>
        </a>
        <nav class="nav" aria-label="Primary">
          ${links}
        </nav>
        <div class="site-header__cta">
          <a class="btn btn--primary btn--sm" href="${escapeAttr(PRIMARY_CTA.href)}" target="_blank" rel="noopener">WhatsApp</a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-nav-toggle>
            <span class="nav-toggle__bar"></span>
            <span class="nav-toggle__bar"></span>
            <span class="sr-only">Menu</span>
          </button>
        </div>
      </div>
      <div class="mobile-nav" id="mobile-nav" hidden data-mobile-nav>
        ${NAV.map(
          (item) =>
            `<a class="mobile-nav__link" href="${escapeAttr(item.href)}">${escapeHtml(item.label)}</a>`,
        ).join('\n        ')}
        <a class="mobile-nav__link mobile-nav__link--cta" href="${escapeAttr(PRIMARY_CTA.href)}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </header>`;
}

export function renderFooter() {
  const columns = Object.entries(FOOTER_LINKS)
    .map(
      ([heading, links]) => `<div class="footer__col">
          <h2 class="footer__heading">${escapeHtml(heading)}</h2>
          <ul class="footer__list">
            ${links
              .map(
                (link) =>
                  `<li><a href="${escapeAttr(link.href)}"${
                    link.external ? ' target="_blank" rel="noopener"' : ''
                  }>${escapeHtml(link.label)}</a></li>`,
              )
              .join('\n            ')}
          </ul>
        </div>`,
    )
    .join('\n        ');

  const year = new Date().getUTCFullYear();

  return `<footer class="site-footer">
      <div class="shell site-footer__inner">
        <div class="footer__brand">
          <a class="brand brand--footer" href="/">
            <span class="brand__mark" aria-hidden="true">MH</span>
            <span class="brand__text">
              <span class="brand__name">${escapeHtml(SITE.name)}</span>
              <span class="brand__role">${escapeHtml(SITE.role)} · ${escapeHtml(SITE.location.display)}</span>
            </span>
          </a>
          <p class="footer__note">
            Building open-source agent tooling for real business systems.
            Reach me on WhatsApp for scoping.
          </p>
          <a class="footer__wa" href="${escapeAttr(waLink('Hi Muhammad, I would like to discuss a project.'))}" target="_blank" rel="noopener">
            <span aria-hidden="true">💬</span> ${escapeHtml(SITE.whatsapp.display)}
          </a>
        </div>
        ${columns}
      </div>
      <div class="shell site-footer__bottom">
        <p>© ${year} ${escapeHtml(SITE.name)}. All rights reserved.</p>
        <p class="footer__meta">
          Generated from the
          <a href="${escapeAttr(SITE.github.masterRecordRepo)}" target="_blank" rel="noopener">GitHub master record</a>.
        </p>
      </div>
    </footer>`;
}

export function renderWhatsAppFab() {
  return `<a class="wa-fab" href="${escapeAttr(
    waLink('Hi Muhammad, I found your portfolio and want to talk about automation.'),
  )}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24-1.44 0-2.86-.37-4.1-1.08l-.29-.17-3.12.82.83-3.04-.19-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.13-8.24zm-2.6 4.1c-.2 0-.51.07-.78.37-.27.3-1.02.99-1.02 2.42s1.05 2.81 1.2 3c.14.2 2.05 3.13 4.96 4.27 2.42.95 2.91.76 3.44.71.53-.05 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.34-.29-.14-1.7-.84-1.96-.94-.26-.09-.46-.14-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.12.29-.34.44-.51.14-.17.19-.29.29-.48.09-.19.05-.36-.02-.51-.07-.14-.65-1.55-.89-2.12-.23-.55-.47-.48-.65-.49-.17 0-.36-.01-.55-.01z"/>
      </svg>
    </a>`;
}

/**
 * Tiny progressive-enhancement script: mobile nav toggle + header shadow on scroll.
 * Inlined to keep the page a single request.
 */
export const BASE_SCRIPT = `<script>
(function () {
  var toggle = document.querySelector('[data-nav-toggle]');
  var panel = document.querySelector('[data-mobile-nav]');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      document.body.classList.toggle('nav-open', !open);
    });
  }
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
</script>`;
