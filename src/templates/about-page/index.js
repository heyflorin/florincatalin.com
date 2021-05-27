import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import { motion } from 'framer-motion'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import Text from '../../jh-ui/Text'
import SectionHeader from '../../jh-ui/SectionHeader'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Link from '../../jh-ui/Link'
import Seo from '../../components/seo'
import PageTitle from '../../components/PageTitle'
import website from '../../../website-config'
import { shouldAnimate } from '../../helpers'
import ContentWrap from '../../components/ContentWrap'
import ProjectImage from '../../components/ProjectImage'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import {
  AboutContentWrap,
  BioFigure,
  BioFigureWrap,
  BioImage,
  BioImageTop,
  BioImageBorder,
  BioText,
  HeaderContentWrap,
  HeaderWrap,
  ComponentsWrap,
  Component,
  ComponentDescription,
  ComponentItemWrap,
  ComponentTitle,
  ComponentWrap,
  Skill,
  SkillsetWrap,
  SkillsWrap,
  SkillWrap,
  UsageExcerpt,
  UsageLink,
  UsagesWrap,
  UsageWrap,
  UsesWrap,
  Section,
  SectionContentWrap,
  OverviewGrid,
  OverviewKey,
  SectionTitle,
  SectionDescription,
  SectionImageWrap,
  SectionImageCaptionWrap,
  AboutSection
} from './styles'

const variants = {
  mounted: {
    transition: { staggerChildren: 0.05, delayChildren: 0.3 }
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

export const Usage = ({ usage }) => {
  const IconComponent = require(`react-feather/dist/icons/${usage.icon}`)
    .default

  return (
    <UsageExcerpt
      element="article"
      aria-labelledby={`${kebabCase(usage.name)}-name ${kebabCase(
        usage.name
      )}-description`}
    >
      <UsageLink href={usage.link} target="_blank" rel="noopener noreferrer">
        <ScreenReaderText>Learn more</ScreenReaderText>
      </UsageLink>
      <div>
        <Padded vertical="s">
          <div>
            <IconComponent color="var(--accent)" size={24} />
          </div>
        </Padded>
        <dt id={`${kebabCase(usage.name)}-name`}>
          <Text order="meta">{usage.name}</Text>
        </dt>
        <dd id={`${kebabCase(usage.name)}-description`}>
          <Text>{usage.description}</Text>
        </dd>
      </div>
    </UsageExcerpt>
  )
}

export const AboutPageTemplate = ({
  location,
  title,
  image,
  components,
  whatIUse,
  skillset,
  sections,
  content
}) => (
  <>
    <Seo
      title={`${title} | ${website.titleAlt}`}
      pathname={location.pathname}
      description="Florin Catalin is a UI/UX designer and front-end engineer. He specializes in leading cross-functional teams to build great, human-centered products. Learn more."
      banner={image.publicURL}
    />
    <HeaderWrap aria-labelledby="about-label">
      <AboutContentWrap>
        <HeaderContentWrap>
          {image && (
            <BioFigureWrap>
              <BioFigure>
                {[
                  {
                    fill: '#09CADA',
                    stroke: false,
                    strokeWidth: false,
                    className: 'topLeft normal transparent',
                    translateXy: '-1.75rem'
                  },
                  {
                    fill: '#ea7963',
                    stroke: false,
                    strokeWidth: false,
                    className: 'bottomRight normal transparent',
                    translateXy: '1.75rem'
                  },
                  {
                    fill: '#004b60',
                    stroke: '#004b60',
                    strokeWidth: '7',
                    className: 'center normal',
                    translateXy: ''
                  },
                  {
                    fill: 'none',
                    stroke: '#09CADA',
                    strokeWidth: '2',
                    className: 'topLeft normal',
                    translateXy: '-1.75rem'
                  },
                  {
                    fill: 'none',
                    stroke: '#ea7963',
                    strokeWidth: '2',
                    className: 'bottomRight lighten',
                    translateXy: '1.75rem'
                  }
                ].map(i => (
                  <BioImageBorder
                    initial={
                      shouldAnimate()
                        ? { opacity: 0, scale: 0.75, x: 0, y: 0 }
                        : false
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: i.translateXy,
                      y: i.translateXy
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 50,
                      mass: 0.1,
                      delay: 0.12
                    }}
                    key={i}
                    className={i.className}
                  >
                    <circle
                      cx="50%"
                      cy="50%"
                      r="49%"
                      fill={i.fill}
                      stroke={i.stroke}
                      strokeWidth={i.strokeWidth}
                    />
                  </BioImageBorder>
                ))}
                <motion.div
                  initial={
                    shouldAnimate()
                      ? { opacity: 0, scale: 0.75, mixBlendMode: 'normal' }
                      : false
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    mixBlendMode: 'lighten'
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 50,
                    mass: 0.1
                  }}
                >
                  <BioImageTop
                    fluid={image.childImageSharp.fluid}
                    alt="Florin Catalin"
                  />
                </motion.div>
              </BioFigure>
            </BioFigureWrap>
          )}
          <BioText>
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
                <Heading level={1} id="about-label">
                  {title || 'About Florin'}
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
                delay: 0.2
              }}
            >
              <Spaced top="m">
                <Text>
                  <MDXRenderer>{content}</MDXRenderer>
                </Text>
              </Spaced>
            </motion.div>
          </BioText>
        </HeaderContentWrap>
      </AboutContentWrap>
    </HeaderWrap>
    {sections.length && (
      <AboutSection>
        <motion.div animate="mounted" variants={variants}>
          <ContentWrap>
            {sections.map((section, index) => (
              <Padded key={index} vertical="5x">
                <Section
                  variants={childVariants}
                  initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                >
                  <SectionContentWrap>
                    <OverviewGrid>
                      <Spaced bottom="s">
                        {section.component && (
                          <OverviewKey>
                            <Text order="meta">{section.component}</Text>
                          </OverviewKey>
                        )}
                        <SectionTitle level={2}>{section.title}</SectionTitle>
                      </Spaced>
                    </OverviewGrid>
                    <SectionDescription>
                      {section.description}
                    </SectionDescription>
                    {section.image && (
                      <>
                        <SectionImageWrap shadow={section.image.shadow}>
                          <ProjectImage image={section.image} />
                        </SectionImageWrap>
                        {section.image.caption && (
                          <SectionImageCaptionWrap>
                            <Spaced top="s">
                              <Text order="caption" element="figcaption">
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
      </AboutSection>
    )}
    {components.component.length && (
      <ComponentsWrap aria-labelledby="components-label">
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
          <AboutContentWrap>
            <SectionHeader>
              <Heading level={2} id="components-label">
                {components.title || 'Involvement'}
              </Heading>
            </SectionHeader>
            <ComponentWrap animate="mounted" variants={variants}>
              {components.component.map((component, index) => (
                <ComponentItemWrap
                  key={index}
                  variants={childVariants}
                  initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                >
                  <Component
                    element="article"
                    aria-labelledby={`${kebabCase(component.name)}-name`}
                  >
                    <div>
                      <ComponentTitle>
                        <Spaced bottom="s">
                          <Heading
                            level={3}
                            id={`${kebabCase(component.name)}-name`}
                          >
                            {component.name}
                          </Heading>
                        </Spaced>
                      </ComponentTitle>
                      <ComponentDescription>
                        {component.description}
                      </ComponentDescription>
                    </div>
                  </Component>
                </ComponentItemWrap>
              ))}
            </ComponentWrap>
          </AboutContentWrap>
        </motion.div>
      </ComponentsWrap>
    )}

    {whatIUse.usages.length && (
      <UsesWrap id="uses" aria-labelledby="uses-label">
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
          <AboutContentWrap>
            <SectionHeader>
              <Heading level={2} id="uses-label">
                {whatIUse.title || 'What I Use'}
              </Heading>
            </SectionHeader>
            <dl>
              <UsagesWrap animate="mounted" variants={variants}>
                {whatIUse.usages.map((usage, index) => (
                  <UsageWrap
                    key={index}
                    variants={childVariants}
                    initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                  >
                    <Usage usage={usage} />
                  </UsageWrap>
                ))}
              </UsagesWrap>
            </dl>
          </AboutContentWrap>
        </motion.div>
      </UsesWrap>
    )}
    {skillset.skills.length && (
      <SkillsetWrap aria-labelledby="skillset-label">
        <motion.div
          initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 50,
            mass: 0.1,
            delay: 0.5
          }}
        >
          <AboutContentWrap>
            <SectionHeader>
              <Heading level={2} color="textInverse" id="skillset-label">
                {skillset.title || 'Skillset'}
              </Heading>
              {/* <Link to="/resume" arrow={true}>
                View resume
              </Link> */}
            </SectionHeader>
            <SkillsWrap animate="mounted" variants={variants}>
              {skillset.skills.map((skill, index) => (
                <SkillWrap
                  key={index}
                  variants={childVariants}
                  initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
                >
                  <Skill hoverable={false}>
                    <Heading level={4} color="textInverse" element="p">
                      {skill.name}
                    </Heading>
                  </Skill>
                </SkillWrap>
              ))}
            </SkillsWrap>
          </AboutContentWrap>
        </motion.div>
      </SkillsetWrap>
    )}
  </>
)

AboutPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.object.isRequired
    }).isRequired
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
  ).isRequired,
  components: PropTypes.shape({
    title: PropTypes.string.isRequired,
    component: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  whatIUse: PropTypes.shape({
    title: PropTypes.string.isRequired,
    usages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  skillset: PropTypes.shape({
    title: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
}

const AboutPage = ({ location, data: { mdx: post } }) => {
  const {
    title,
    bioimage,
    components,
    whatIUse,
    skillset,
    sections
  } = post.frontmatter

  return (
    <AboutPageTemplate
      location={location}
      title={title}
      image={bioimage}
      components={components}
      whatIUse={whatIUse}
      skillset={skillset}
      sections={sections}
      content={post.body}
    />
  )
}

AboutPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.node.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        bioimage: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.object.isRequired
          }).isRequired
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
        ).isRequired,
        components: PropTypes.shape({
          title: PropTypes.string.isRequired,
          component: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired,
        whatIUse: PropTypes.shape({
          title: PropTypes.string.isRequired,
          usages: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
              link: PropTypes.string.isRequired,
              icon: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired,
        skillset: PropTypes.shape({
          title: PropTypes.string.isRequired,
          skills: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage {
    mdx(frontmatter: { templateKey: { eq: "about-page" } }) {
      body
      frontmatter {
        title
        bioimage {
          childImageSharp {
            fluid(maxWidth: 590, quality: 75, srcSetBreakpoints: [340]) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        components {
          title
          component {
            name
            description
          }
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
        whatIUse: what_i_use {
          title
          usages: usage {
            name
            description
            link
            icon
          }
        }
        skillset {
          title
          skills: skill {
            name
          }
        }
      }
    }
  }
`
