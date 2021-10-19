import React, { useEffect, useState } from 'react'

import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import clsx from 'clsx'
import styles from './index.module.css'
import { useCoverage } from '@finetwork/coverage-react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/install"
          >
            Getting started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  // const {
  //   state: { installationAddress },
  // } = useCoverage()
  useEffect(() => {}, [])
  return (
    <Layout title={siteConfig.title} description="Coverage SDK">
      <HomepageHeader />
      <main>{/* <HomepageFeatures />   */}</main>
    </Layout>
  )
}
