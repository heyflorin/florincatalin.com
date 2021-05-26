import React from 'react'
import PropTypes from 'prop-types'
import kebabCase from 'lodash/kebabCase'
import Heading from '../Heading'
import Text from '../Text'
import Spaced from '../Spaced'
import Padded from '../Padded'
import ScreenReaderText from '../ScreenReaderText'
import { WorkCard, CardContent, ImageWrap, Link, TagWrap } from './styles'
import Tag from '../../jh-ui/Tag'
import ProjectImage from '../../components/ProjectImage'

const WorkExcerpt = ({
  link,
  image,
  svg,
  date,
  title,
  excerpt,
  role,
  ...props
}) => {
  return (
    <WorkCard
      padding={false}
      element="article"
      aria-labelledby={`${kebabCase(title)}-label`}
      {...props}
    >
      <Link to={link}>
        <ScreenReaderText>Go to project</ScreenReaderText>
      </Link>
      <CardContent>
        {image && (
          <ImageWrap>
            {/* {image && <img src={image.publicURL} alt="" role="presentation" />} */}
            <ProjectImage image={image} />
          </ImageWrap>
        )}
        {svg && (
          <ImageWrap dangerouslySetInnerHTML={{ __html: svg || undefined }} />
        )}
        <Padded top="xxl" left="xxl" right="xxl" bottom="2x">
          <div>
            <Spaced bottom="l">
              <Heading level={3} id={`${kebabCase(title)}-label`}>
                {title}
              </Heading>
            </Spaced>
            <TagWrap key={role + `tag`}>
              <Tag aria-label={`My role on the project`}>{role}</Tag>
            </TagWrap>
          </div>
        </Padded>
      </CardContent>
    </WorkCard>
  )
}

WorkExcerpt.propTypes = {
  link: PropTypes.string.isRequired,
  image: PropTypes.shape({
    publicURL: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string
  }),
  svg: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

WorkExcerpt.defaultProps = {
  date: new Date()
}

export default WorkExcerpt
