import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Image from 'gatsby-image'
import ThemeContext from '../../context/theme'

const NoScriptImage = styled.img`
  max-width: 100%;
`

const ProjectImage = ({ image, ...props }) => {
  const { themeName } = useContext(ThemeContext)
  return (
    <figure {...props} height="100%">
      {themeName &&
        (image.animation ? (
          <video
            autoPlay
            muted
            loop
            muted
            playsInline
            alt={image.alt}
            width="100%"
            crossOrigin="anonymous"
          >
            <source src={image.animation.publicURL} type="video/mp4" />
            <img
              src={image.animation.publicURL}
              alt={image.alt}
              width={'100%'}
            />
          </video>
        ) : (
          <Image
            alt={image.alt || ''}
            fluid={image[themeName].childImageSharp.fluid}
          />
        ))}
      <noscript>
        <picture>
          <source
            srcSet={image.dark.publicURL}
            media="(prefers-color-scheme: dark)"
          />
          <source
            srcSet={image.light.publicURL}
            media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
          />
          <NoScriptImage src={image.light.publicURL} alt={image.alt || ''} />
        </picture>
      </noscript>
    </figure>
  )
}

ProjectImage.propTypes = {
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
    alt: PropTypes.string
  }).isRequired
}

export default ProjectImage
