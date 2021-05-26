import React, { useContext, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'react-feather'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Spaced from '../../jh-ui/Spaced'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import Link from '../../jh-ui/Link'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Seo from '../../components/seo'
import ContentWrap from '../../components/ContentWrap'
import PageTitle from '../../components/PageTitle'
import ProjectImage from '../../components/ProjectImage'
import CalloutLink from '../../components/CalloutLink'
import ThemeContext from '../../context/theme'
import website from '../../../website-config'
import { addAlert, shouldAnimate } from '../../helpers'
import Alert from '../../jh-ui/Alert'
import {
  CloseButton,
  Header,
  LightThemeAlert,
  LightThemeAlertWrap,
  ProjectWrap,
  Section,
  OverviewSection,
  OverviewSectionWrap,
  SectionContentWrap,
  SectionDescription,
  SectionImageWrap,
  SectionImageCaptionWrap,
  OverviewContentWrap,
  OverviewKey,
  OverviewValue,
  OverviewDescription,
  OverviewGrid,
  SectionTitle,
  ThemeAlertContentWrap,
  ProjectImageWrap,
  SubscribeForm,
  SubscribeFormContent,
  SubscribeInput,
  SubscribeButton
} from './styles'

const variants = {
  mounted: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
}

const childVariants = {
  mounted: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      mass: 0.1
    }
  }
}

export const ProjectTemplate = ({
  location,
  title,
  component,
  description,
  role,
  client,
  products,
  link,
  coverImage,
  sections,
  locked
}) => {
  const { themeName, setTheme } = useContext(ThemeContext)
  const [isLocked, setLocked] = useState(null)
  const [themeAlertVisible, setThemeAlertVisible] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const inputRef = useRef()

  useEffect(() => {
    if (locked) setLocked(!localStorage.getItem('isUnlocked'))
    // Check if a there are separate dark/light variations of section images
    if (
      sections.some(
        item =>
          item.image &&
          item.image.light &&
          item.image.light.publicURL &&
          (item.image.dark && item.image.dark.publicURL) &&
          item.image.light.publicURL != item.image.dark.publicURL
      )
    ) {
      try {
        const themeAlertDismissed = localStorage.getItem('themeAlertDismissed')
        setThemeAlertVisible(!themeAlertDismissed)
      } catch (error) {
        setThemeAlertVisible(true)
      }
    }
  }, [])

  const swapTheme = event => {
    event.preventDefault()
    setTheme(themeName === 'light' ? 'dark' : 'light')
    dismissThemeAlert()
  }

  const dismissThemeAlert = () => {
    setThemeAlertVisible(false)
    localStorage.setItem('themeAlertDismissed', 'true')
  }

  const handleUnlock = event => {
    setError(null)
    event.preventDefault()

    const formData = new FormData(event.target)
    const password = formData.get('password')

    if (password === process.env.GATSBY_LOCKED_CONTENT_KEY) {
      setLocked(false)
      setSuccess(true)
      localStorage.setItem('isUnlocked', 'true')
      addAlert('Password accepted')
    } else {
      setError('You entered an incorrect password, please try again.')
    }
  }

  return (
    <>
      <Seo
        title={`${title} | ${website.titleAlt}`}
        pathname={location.pathname}
        description={description}
        banner={
          coverImage && coverImage.light
            ? coverImage.light.publicURL
            : undefined
        }
        article
      />
      <ProjectWrap>
        <Header>
          <ContentWrap>
            <Padded vertical="5x">
              <div>
                <motion.div
                  initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
                >
                  <Text order="meta">{role}</Text>
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
                  <PageTitle>
                    <Heading level={1}>{title}</Heading>
                  </PageTitle>
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
                  <Spaced top="s">
                    <Link to="/work/" arrow={true} arrowPosition="left">
                      See all projects
                    </Link>
                  </Spaced>
                </motion.div>
              </div>
            </Padded>
          </ContentWrap>
        </Header>
        {isLocked && (
          <motion.div
            initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 50,
              mass: 0.1,
              delay: 0.23
            }}
          >
            <Spaced vertical="xl">
              <SubscribeForm onSubmit={handleUnlock}>
                <div>
                  <SubscribeFormContent>
                    <div>
                      <label htmlFor="email" className="visually-hidden">
                        Enter password
                      </label>
                      <SubscribeInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        ref={inputRef}
                      />
                    </div>
                    <Spaced top="m">
                      <SubscribeButton order="accent" size="large">
                        Unlock
                      </SubscribeButton>
                    </Spaced>
                  </SubscribeFormContent>
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={
                          shouldAnimate() ? { opacity: 0, y: 50 } : false
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{
                          type: 'spring',
                          stiffness: 50,
                          mass: 0.1,
                          delay: 0.1
                        }}
                      >
                        <ContentWrap>
                          <Spaced top="m">
                            <Alert>{error}</Alert>
                          </Spaced>
                        </ContentWrap>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={
                          shouldAnimate() ? { opacity: 0, y: 50 } : false
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{
                          type: 'spring',
                          stiffness: 50,
                          mass: 0.1,
                          delay: 0.1
                        }}
                      >
                        <Spaced top="m">
                          <Alert order="info">Unlocking the case study</Alert>
                        </Spaced>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SubscribeForm>
            </Spaced>
          </motion.div>
        )}
        {!isLocked && (
          <>
            <motion.div
              initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                type: 'spring',
                stiffness: 50,
                mass: 0.1,
                delay: 0.1
              }}
            >
              <OverviewSection>
                <motion.div animate="mounted" variants={variants}>
                  <ContentWrap>
                    <Padded vertical="5x">
                      <OverviewSectionWrap
                        variants={childVariants}
                        initial={
                          shouldAnimate() ? { opacity: 0, y: 50 } : false
                        }
                      >
                        <OverviewContentWrap>
                          <OverviewGrid>
                            <Spaced bottom="xs">
                              <OverviewKey>
                                <Text order="meta">Client</Text>
                              </OverviewKey>
                              <OverviewValue>{client}</OverviewValue>
                            </Spaced>
                            <Spaced bottom="xs">
                              <OverviewKey>
                                <Text order="meta">Products</Text>
                              </OverviewKey>
                              <OverviewValue>{products}</OverviewValue>
                            </Spaced>
                          </OverviewGrid>
                          <Spaced bottom="2x">
                            <OverviewDescription>
                              <Spaced bottom="xs">
                                <OverviewKey>
                                  <Text order="meta">Overview</Text>
                                </OverviewKey>
                                <OverviewValue>{description}</OverviewValue>{' '}
                              </Spaced>
                            </OverviewDescription>
                          </Spaced>
                          {coverImage && (
                            <Spaced bottom="2x">
                              <ProjectImageWrap shadow={coverImage.shadow}>
                                <ProjectImage image={coverImage} />
                              </ProjectImageWrap>
                            </Spaced>
                          )}
                          {link && link.url && link.title && (
                            <CalloutLink
                              url={link.url}
                              title={link.title}
                              description="View this project live on the web"
                            />
                          )}
                        </OverviewContentWrap>
                      </OverviewSectionWrap>
                    </Padded>
                  </ContentWrap>
                </motion.div>
              </OverviewSection>
            </motion.div>
            {sections.length && (
              <section>
                <motion.div animate="mounted" variants={variants}>
                  <ContentWrap>
                    {sections.map((section, index) => (
                      <Padded key={index} vertical="5x">
                        <Section
                          variants={childVariants}
                          initial={
                            shouldAnimate() ? { opacity: 0, y: 50 } : false
                          }
                        >
                          <SectionContentWrap>
                            <OverviewGrid>
                              <Spaced bottom="s">
                                {section.component && (
                                  <OverviewKey>
                                    <Text order="meta">
                                      {section.component}
                                    </Text>
                                  </OverviewKey>
                                )}
                                <SectionTitle level={2}>
                                  {section.title}
                                </SectionTitle>
                              </Spaced>
                            </OverviewGrid>
                            <Spaced bottom="2x">
                              <SectionDescription>
                                {section.description}
                              </SectionDescription>
                            </Spaced>
                            {section.image && (
                              <>
                                <SectionImageWrap shadow={section.image.shadow}>
                                  <ProjectImage image={section.image} />
                                </SectionImageWrap>
                                {section.image.caption && (
                                  <SectionImageCaptionWrap>
                                    <Spaced top="s">
                                      <Text
                                        order="caption"
                                        element="figcaption"
                                      >
                                        {section.image.caption}
                                      </Text>
                                    </Spaced>
                                  </SectionImageCaptionWrap>
                                )}
                              </>
                            )}
                          </SectionContentWrap>
                        </Section>
                      </Padded>
                    ))}
                  </ContentWrap>
                </motion.div>
              </section>
            )}
          </>
        )}

        <AnimatePresence>
          {!isLocked && themeAlertVisible && (
            <LightThemeAlertWrap
              initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
              style={{ x: '-50%' }}
            >
              <ContentWrap>
                <LightThemeAlert>
                  <Padded vertical="m" horizontal="xl">
                    <ThemeAlertContentWrap>
                      <Text>
                        <Link element="button" onClick={swapTheme}>
                          Swap themes
                        </Link>{' '}
                        to see {themeName === 'light' ? 'dark' : 'light'}{' '}
                        versions of these designs (where applicable)
                      </Text>
                      <CloseButton onClick={dismissThemeAlert}>
                        <ScreenReaderText>Dismiss Theme Alert</ScreenReaderText>
                        <X />
                      </CloseButton>
                    </ThemeAlertContentWrap>
                  </Padded>
                </LightThemeAlert>
              </ContentWrap>
            </LightThemeAlertWrap>
          )}
        </AnimatePresence>
      </ProjectWrap>
    </>
  )
}

ProjectTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  products: PropTypes.string.isRequired,
  link: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string
  }),
  coverImage: PropTypes.shape({
    light: PropTypes.shape({
      publicURL: PropTypes.string.isRequired
    }).isRequired,
    shadow: PropTypes.bool.isRequired,
    alt: PropTypes.string
  }).isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      component: PropTypes.string,
      description: PropTypes.string.isRequired,
      image: PropTypes.shape({
        light: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.object.isRequired
          }).isRequired,
          publicURL: PropTypes.string.isRequired
        }).isRequired,
        dark: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.object.isRequired
          }).isRequired,
          publicURL: PropTypes.string.isRequired
        }).isRequired,
        animation: PropTypes.shape({
          publicURL: PropTypes.string
        }),
        alt: PropTypes.string,
        caption: PropTypes.string,
        shadow: PropTypes.bool.isRequired
      })
    }).isRequired
  ).isRequired
}

const Project = ({ location, data: { mdx: post } }) => (
  <ProjectTemplate
    location={location}
    title={post.frontmatter.title}
    description={post.frontmatter.description}
    role={post.frontmatter.role}
    client={post.frontmatter.client}
    products={post.frontmatter.products}
    link={post.frontmatter.link}
    coverImage={post.frontmatter.coverImage}
    sections={post.frontmatter.sections}
    locked={post.frontmatter.locked}
  />
)

Project.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        client: PropTypes.string.isRequired,
        products: PropTypes.string.isRequired,
        locked: PropTypes.boolean,
        link: PropTypes.shape({
          url: PropTypes.string,
          title: PropTypes.string
        }),
        coverImage: PropTypes.shape({
          light: PropTypes.shape({
            publicURL: PropTypes.string.isRequired
          }).isRequired,
          shadow: PropTypes.bool.isRequired,
          alt: PropTypes.string
        }).isRequired,
        sections: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            component: PropTypes.string,
            description: PropTypes.string.isRequired,
            image: PropTypes.shape({
              light: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                  fluid: PropTypes.object.isRequired
                }).isRequired,
                publicURL: PropTypes.string.isRequired
              }).isRequired,
              dark: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                  fluid: PropTypes.object.isRequired
                }).isRequired,
                publicURL: PropTypes.string.isRequired
              }).isRequired,
              animation: PropTypes.shape({
                publicURL: PropTypes.string
              }),
              alt: PropTypes.string,
              caption: PropTypes.string,
              shadow: PropTypes.bool.isRequired
            })
          }).isRequired
        ).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default Project

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        role
        client
        products
        locked
        link: link {
          url
          title
        }
        coverImage: coverimage {
          light {
            childImageSharp {
              fluid(maxWidth: 960, srcSetBreakpoints: [340, 680]) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
            publicURL
          }
          dark {
            childImageSharp {
              fluid(maxWidth: 960, srcSetBreakpoints: [340, 680]) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
            publicURL
          }
          shadow
          alt
        }
        sections: section {
          title
          component
          description
          image: sectionimage {
            light {
              childImageSharp {
                fluid(
                  maxWidth: 960
                  quality: 75
                  srcSetBreakpoints: [340, 680]
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
              publicURL
            }
            dark {
              childImageSharp {
                fluid(
                  maxWidth: 960
                  quality: 75
                  srcSetBreakpoints: [340, 680]
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
              publicURL
            }
            animation {
              publicURL
            }
            alt
            caption
            shadow
          }
        }
      }
    }
  }
`
