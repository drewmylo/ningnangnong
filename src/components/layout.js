import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,  
} from './layout.module.css'
import Logo from './ning_nang_nong_logo.svg'

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
              <header >
                <img src={Logo}></img>
              </header>
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
            <Link to="/musings" className={navLinkText}>
              Musings
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/basher" className={navLinkText}>
              Basher
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