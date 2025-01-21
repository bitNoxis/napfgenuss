import Testimonials from './components/widgets/Testimonials.astro';
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
          text: 'Zusammenstellen',
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
      title: 'Weitere Seiten',
      links: [
        { text: "Startseite", href: '/' },
        { text: "So funktioniert's", href: '/services' },
        { text: 'Unser Futter - Entdecken', href: '/search' },
        { text: 'Unser Futter - Kalkulator', href: '/products' },
        // { text: 'AGBs', href: '#' },
        // { text: 'Datenschutz', href: '#' },
      ],
    },
    {
      title: 'Formulare',
      links: [
        { text: "Log In", href: '#/login' },
        { text: "Zur Kasse", href: '#/checkout' },
        { text: "Kontakt", href: '/contact' },
      ],
    },
    {
      title: 'Unternehmen',
      links: [
        { text: 'Das sind wir', href: '/about' },
        { text: 'Blog', href: '/blog' },
        { text: 'Impressum', href: '/impressum' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'AGBs', href: getPermalink('/terms') },
    { text: 'Datenschutz', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/napfgenuss_shop/' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `
    Mit Liebe gemacht von <a class="text-blue-600 underline dark:text-muted" href="/index"> NapfGenuss</a> · Alle Rechte vorbehalten
    <br> © Finn Künzel, Fiona Wüpperling, Anna Musilinski, Silas Kruckenberg; 2025
  `,
};
