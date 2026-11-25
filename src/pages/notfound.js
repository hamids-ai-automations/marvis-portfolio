/**
 * 404 page. Served by Firebase Hosting for any unmatched path.
 */

import { SITE } from '../lib/config.js';
import { BASE_SCRIPT, renderPage } from '../lib/layout.js';
import { buildSeo } from '../lib/seo.js';
import { button } from '../templates/components.js';

export function renderNotFound(model) {
  const seo = buildSeo({
    title: 'Page not found',
    description: 'That page does not exist. Start from the home page, the project index, or message directly on WhatsApp.',
    path: '/404.html',
    noindex: true,
  });

  const body = `<section class="section notfound">
      <div class="shell shell--narrow">
        <p class="eyebrow">404</p>
        <h1 class="page-header__title">This page does not exist</h1>
        <p class="page-header__lede">The link may be old, or the page may have moved when the site was rebuilt from the master record.</p>
        <div class="hero__actions">
          ${button('/', 'Home')}
          ${button('/projects/', 'Projects', { variant: 'ghost' })}
          ${button(SITE.whatsapp.url, 'WhatsApp', { variant: 'ghost', external: true })}
        </div>
        <p class="muted">Popular starting points: ${model.services
          .slice(0, 3)
          .map((s) => `<a href="${s.path}">${s.nav}</a>`)
          .join(' · ')}</p>
      </div>
    </section>`;

  return {
    path: '/404.html',
    seo,
    html: renderPage({ seo, body, pageClass: 'page-404', activePath: '', scripts: BASE_SCRIPT }),
    priority: null,
    noindex: true,
  };
}
