import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '',
      links: [
        {
          text: "So funktioniert's",
          href: getPermalink('/services'),
        },
      ],
    },
    {
      text: '',
      links: [
        {
          text: 'Das sind wir',
          href: getPermalink('/about'),
        },
      ],
    },
    {
      text: 'Unser Futter',
      links: [
        {
          text: 'Entdecken',
          href: getPermalink('/search'),
        },
        {
          text: 'Produkte',
          href: getPermalink('/products'),
        },
      ],
    },

    {
      text: 'Blog',
      links: [
        {
          text: 'Alle Artikel',
          href: getBlogPermalink(),
        },
        {
          text: 'Artikel XY',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'Kategorien',
          href: getPermalink('tutorials', 'category'),
        },
      ],
    },
  ],
  actions: [{ variant: 'primary', target: '_self', text: 'Anmelden', href: '/contact'}]
};

export const footerData = {
  links: [
    {
      title: 'Alle Seiten',
      links: [
        { text: "So funktioniert's", href: '/services' },
        { text: 'Das sind wir', href: '/about' },
        { text: 'Unser Futter entdecken', href: '/search' },
        { text: 'Unser Futter Produkte', href: '/products' },
        { text: 'Customer stories', href: '#' },
        // { text: 'AGBs', href: '#' },
        // { text: 'Datenschutz', href: '#' },
      ],
    },
    {
      title: 'Hilfe',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' },
      ],
    },
    {
      title: 'Unternehmen',
      links: [
        { text: 'About', href: '/about' },
        { text: 'Blog', href: '/blog' },
        { text: 'Shop', href: '/search' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'AGBs', href: getPermalink('/terms') },
    { text: 'Datenschutz', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `
    Mit Liebe gemacht von <a class="text-blue-600 underline dark:text-muted" href="/index"> NapfGenuss</a> · Alle Rechte vorbehalten
    <br> © Silas Kruckenberg, Finn Künzel, Fiona, Anna 2025
  `,
};
