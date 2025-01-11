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
        // {
        //   text: 'Kontakt',
        //   href: getPermalink('/contact'),
        // },
        // {
        //   text: 'Geschäftsbedingungen',
        //   href: getPermalink('/terms'),
        // },
        // {
        //   text: 'Datenschutz',
        //   href: getPermalink('/privacy'),
        // },
      ],
    },
    {
      text: 'Unser Futter',
      links: [
        {
          text: 'Suchen',
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
        { text: 'Features', href: '#' },
        { text: 'Security', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Enterprise', href: '#' },
        { text: 'Customer stories', href: '#' },
        { text: 'Pricing', href: '#' },
        { text: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'Developer API', href: '#' },
        { text: 'Partners', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' },
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
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
