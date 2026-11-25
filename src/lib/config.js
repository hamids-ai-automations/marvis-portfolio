/**
 * Single source of truth for site identity, URLs, and contact routing.
 * Anything that appears on more than one page lives here.
 */

export const SITE = {
  name: 'Muhammad Hamid',
  role: 'AI Automation Engineer',
  company: 'Marvis AI Automations',
  url: 'https://marvis.web.app',
  locale: 'en',
  lang: 'en',
  ogImage: '/assets/og-default.png',
  themeColor: '#0b1120',
  location: {
    city: 'Lahore',
    country: 'Pakistan',
    display: 'Lahore, Pakistan',
  },
  github: {
    user: 'hamids-ai-automations',
    url: 'https://github.com/hamids-ai-automations',
    masterRecordRepo: 'https://github.com/hamids-ai-automations/github-profile-master-record',
    masterRecordRaw:
      'https://raw.githubusercontent.com/hamids-ai-automations/github-profile-master-record/main/MASTER_DATABASE.json',
    siteRepo: 'https://github.com/hamids-ai-automations/marvis-portfolio',
  },
  whatsapp: {
    /** Human-readable form shown in the UI. */
    display: '+92 316 7417135',
    /** Digits only, international format, used by wa.me. */
    e164: '923167417135',
    get url() {
      return `https://wa.me/${this.e164}`;
    },
  },
};

/**
 * Build a WhatsApp deep link with a pre-filled message.
 * @param {string} message
 * @returns {string}
 */
export function waLink(message) {
  const base = `https://wa.me/${SITE.whatsapp.e164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Primary call to action used across the site. */
export const PRIMARY_CTA = {
  label: 'Discuss your automation on WhatsApp',
  href: waLink(
    'Hi Muhammad, I found your portfolio and want to discuss an AI automation project.',
  ),
};

export const NAV = [
  { label: 'Services', href: '/services/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Articles', href: '/articles/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const FOOTER_LINKS = {
  Services: [
    { label: 'AI Automation', href: '/services/ai-automation/' },
    { label: 'AI Agent Development', href: '/services/ai-agent-development/' },
    { label: 'MCP Development', href: '/services/mcp-development/' },
    { label: 'Python Automation', href: '/services/python-automation/' },
    { label: 'GoHighLevel Automation', href: '/services/gohighlevel-automation/' },
    { label: 'Marketing Technology', href: '/services/marketing-technology/' },
  ],
  'Selected Work': [
    { label: 'All projects', href: '/projects/' },
    { label: 'Shopify Growth MCP', href: '/projects/shopify-growth-mcp/' },
    { label: 'Gemini Reliability Kit', href: '/projects/gemini-agent-reliability-kit/' },
    { label: 'GoHighLevel Engine', href: '/projects/ghl-automation-engine/' },
  ],
  Company: [
    { label: 'About', href: '/about/' },
    { label: 'Articles', href: '/articles/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'GitHub', href: SITE.github.url, external: true },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy/' },
    { label: 'Terms', href: '/terms/' },
  ],
};
