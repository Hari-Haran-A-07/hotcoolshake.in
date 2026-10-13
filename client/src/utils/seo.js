/**
 * SEO & Structured Metadata Engine for HOT COOL SHAKE
 */

export const BRAND_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'HOT COOL SHAKE',
  image: 'https://hotcoolshake.in/favicon.svg',
  telephone: '+1-800-468-2665',
  url: 'https://hotcoolshake.in',
  priceRange: '$$',
  servesCuisine: ['Specialty Coffee', 'Artisanal Cold Brew', 'Luxury Shakes'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '450 Fifth Avenue',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10018',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '23:00',
    },
  ],
};

export const updatePageMeta = ({ title, description, keywords, canonical }) => {
  if (title) {
    document.title = `${title} | HOT COOL SHAKE`;
  }
  if (description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;
  }
  if (keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;
  }
  if (canonical) {
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonical;
  }
};
