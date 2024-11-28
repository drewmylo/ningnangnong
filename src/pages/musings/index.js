import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const SDPage = ({ data }) => {
  return (
    <Layout pageTitle="Musings">
      {
        data.allMdx.nodes.map(node => (
          <article key={node.id}>
            <h2>
              <Link to={`/musings/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p>Posted: {node.frontmatter.date}</p>
          </article>
        ))
      }
    </Layout>
  )
}

export const query = graphql`
{
  allMdx(sort: {frontmatter: {date: DESC}}, filter:{frontmatter: {category: {eq: "musings"}}}) {
    nodes {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        title
        slug
      }
      id
    }
  }
}`

export const Head = () => <Seo title="Musings" />

export default SDPage