/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `ningnangnong`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [    
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `spring_distilled`,
        path: `${__dirname}/spring_distilled`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `musings`,
        path: `${__dirname}/musings`
      }
    },

    "gatsby-plugin-mdx",
],
}
