/** Renders a JSON-LD structured-data script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface Crumb {
  name: string;
  href?: string;
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: `${item.href}` } : {}),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}/services/${opts.slug}/`,
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/services/${opts.slug}/`,
    },
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  slug: string;
  date: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.headline,
    description: opts.description,
    url: `${SITE_URL}/articles/${opts.slug}/`,
    datePublished: opts.date,
    dateModified: opts.date,
    inLanguage: "en",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: `${SITE_URL}/articles/${opts.slug}/`,
    ...(opts.keywords ? { keywords: opts.keywords.join(", ") } : {}),
  };
}

export function softwareSchema(opts: {
  name: string;
  description: string;
  slug: string;
  programmingLanguage: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: opts.name,
    description: opts.description,
    codeRepository: opts.url,
    programmingLanguage: opts.programmingLanguage,
    url: `${SITE_URL}/projects/${opts.slug}/`,
    author: { "@id": `${SITE_URL}/#person` },
    license: "https://opensource.org/licenses/MIT",
  };
}

const SITE_URL = "https://marvis.web.app";
