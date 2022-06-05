require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://nyusiam.org",
    title: "NYU SIAM",
  },
  plugins: [
    'gatsby-plugin-postcss',
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        quality: 50,
        icon: '/src/images/icon.png'
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        schemas: {
          about: require('./custom_types/about.json'),
          event: require('./custom_types/event.json'),
          people: require('./custom_types/people.json'),
        },
      },
    },
  ],
};
