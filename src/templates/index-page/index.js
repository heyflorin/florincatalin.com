import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { motion } from 'framer-motion'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import Text from '../../jh-ui/Text'
import SectionHeader from '../../jh-ui/SectionHeader'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Button from '../../jh-ui/Button'
import Link from '../../jh-ui/Link'
import Seo from '../../components/seo'
import PageTitle from '../../components/PageTitle'
import RecentWork from '../../components/RecentWork'
// import Experiments from '../../components/Experiments'
import { shouldAnimate } from '../../helpers'
import ThemeContext from '../../context/theme'
import Stacks from '../../stacks'

import {
  Canvas,
  // ExperimentsWrap,
  HeaderContentWrap,
  HeaderTextWrap,
  HeaderWrap,
  HomeContentWrap,
  HomeIllustration,
  RecentWorkWrap,
  StacksWrap
} from './styles'
import HomeIllustrationSrc from '../../img/home-illustration.png'

export const IndexPageTemplate = ({ title, description, experiments }) => {
  const [delayed, setDelayed] = useState(true)
  const { themeName } = useContext(ThemeContext)
  const prevThemeName = useRef()

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 600)
    return () => clearTimeout(timeout)
  }, [])

  // useEffect(() => {
  //   if (prevThemeName.current != themeName) {
  //     headerScene.current.updateFog(themeName)
  //   }
  //   prevThemeName.current = themeName
  // }, [themeName])

  return (
    <>
      <Seo />
      <HeaderWrap aria-labelledby="introduction-label">
        {shouldAnimate() && !delayed && (
          <StacksWrap
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'spring', stiffness: 3, mass: 0.9 }}
            role="presentation"
          >
            <Stacks />
          </StacksWrap>
        )}
        <noscript>
          <HomeIllustration
            src={HomeIllustrationSrc}
            alt=""
            role="presentation"
          />
        </noscript>
        <HomeContentWrap>
          <HeaderContentWrap>
            <HeaderTextWrap>
              <motion.div
                initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
              >
                <PageTitle>
                  <Heading level={1} id="introduction-label">
                    {title}
                  </Heading>
                </PageTitle>
              </motion.div>
              <motion.div
                initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 50,
                  mass: 0.1,
                  delay: 0.1
                }}
              >
                <Spaced top="m">
                  <Text>{description}</Text>
                </Spaced>
              </motion.div>
              <motion.div
                initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 50,
                  mass: 0.1,
                  delay: 0.2
                }}
              >
                <Spaced top="xxl">
                  <Button order="accent" to="/about" as={GatsbyLink}>
                    Learn more
                  </Button>
                </Spaced>
              </motion.div>
            </HeaderTextWrap>
          </HeaderContentWrap>
        </HomeContentWrap>
      </HeaderWrap>
      <RecentWorkWrap aria-labelledby="recent-articles-label">
        <HomeContentWrap>
          <SectionHeader>
            <motion.div
              initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 50,
                mass: 0.1,
                delay: 0.3
              }}
            >
              <Heading level={2} id="recent-articles-label">
                Selected Work
              </Heading>
            </motion.div>
            <motion.div
              initial={shouldAnimate() ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 50,
                mass: 0.1,
                delay: 0.4
              }}
            >
              <Link
                to="/work"
                arrow={true}
                aria-labelledby="view-all-articles-label"
              >
                <span aria-hidden>View all</span>
                <ScreenReaderText id="view-all-articles-label">
                  View all work
                </ScreenReaderText>
              </Link>
            </motion.div>
          </SectionHeader>
          <RecentWork />
        </HomeContentWrap>
      </RecentWorkWrap>
      {/* <ExperimentsWrap aria-labelledby="recent-experiments-label">
        <HomeContentWrap>
          <SectionHeader>
            <motion.div
              initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 50,
                mass: 0.1,
                delay: 0.4
              }}
            >
              <Heading
                level={2}
                color="textInverse"
                id="recent-experiments-label"
              >
                Recent Experiments
              </Heading>
            </motion.div>
            <motion.div
              initial={shouldAnimate() ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 50,
                mass: 0.1,
                delay: 0.5
              }}
            >
              <Link
                href="https://codepen.io/jonathanharrell/"
                target="_blank"
                rel="noopener noreferrer"
                arrow={true}
                aria-labelledby="view-all-experiments-label"
              >
                <span aria-hidden>View all</span>
                <ScreenReaderText id="view-all-experiments-label">
                  View all experiments
                </ScreenReaderText>
              </Link>
            </motion.div>
          </SectionHeader>
          <Experiments experiments={experiments} />
        </HomeContentWrap>
      </ExperimentsWrap> */}
    </>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
  // experiments: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string.isRequired,
  //     title: PropTypes.string.isRequired,
  //     date: PropTypes.string.isRequired
  //   })
  // ).isRequired
}

const IndexPage = ({
  data: {
    mdx: { frontmatter }
  }
}) => (
  <IndexPageTemplate
    title={frontmatter.title}
    description={frontmatter.description}
    // experiments={frontmatter.experiments}
  />
)

IndexPage.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
        // experiments: PropTypes.arrayOf(
        //   PropTypes.shape({
        //     id: PropTypes.string.isRequired,
        //     title: PropTypes.string.isRequired,
        //     date: PropTypes.string.isRequired
        //   })
        // ).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    mdx(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        description
        experiments {
          id
          title
          date
        }
      }
    }
  }
`
