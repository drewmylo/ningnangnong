import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle
  
} from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `)
    
  return (
    <div className={container}>
              <header className={siteTitle}>{data.site.siteMetadata.title}</header>

      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/spring_distilled" className={navLinkText}>
              Spring Distilled
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/react_distilled" className={navLinkText}>
              React Distilled
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/tech_adventures" className={navLinkText}>
              Tech Adventures
            </Link>
          </li>

        </ul>
      </nav>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}

export default Layout