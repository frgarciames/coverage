/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Getting started',
      collapsed: false,
      items: ['getting-started/install', 'getting-started/config'],
    },
    {
      type: 'category',
      label: 'Usage',
      collapsed: false,
      items: [
        'usage/installation-address',
        'usage/address-history',
        'usage/events',
        'usage/coverage',
        {
          type: 'category',
          label: 'React',
          collapsed: false,
          items: [
            'usage/react/install',
            'usage/react/config',
            'usage/react/usage',
          ],
        },
      ],
    },
  ],
}
