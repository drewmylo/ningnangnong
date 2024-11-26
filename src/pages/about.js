import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <p>Τὰ πάντα ῥεῖ καὶ οὐδὲν μένει</p>
    </Layout>
  )
}

export const Head = () => <Seo title="Home Page" />

export default AboutPage