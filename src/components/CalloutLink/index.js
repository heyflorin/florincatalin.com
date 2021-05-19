import React from 'react'
import PropTypes from 'prop-types'
import kebabCase from 'lodash/kebabCase'
import Spaced from '../../jh-ui/Spaced'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import { ExternalLink } from 'react-feather'
import { CalloutLinkFigure, CalloutLinkLink, CalloutLinkWrap } from './styles'

const CalloutLink = ({ url, title, thumbnailUrl }) => (
  <Spaced bottom="5x">
    <CalloutLinkWrap
      padding={false}
      aria-labelledby={`${kebabCase(title)}-label`}
      element="article"
    >
      <CalloutLinkLink href={url} target="_blank" rel="noopener noreferrer">
        <ScreenReaderText>View this project on the web</ScreenReaderText>
      </CalloutLinkLink>
      <CalloutLinkFigure>
        <ExternalLink size={32} />
      </CalloutLinkFigure>
      <Padded vertical="2x" horizontal="xl">
        <div>
          <Heading level={5} id={`${kebabCase(title)}-label`} element="h2">
            {title}
          </Heading>
          <Spaced top="xs">
            <Text element="p" color="textLighter">
              View this project on the web
            </Text>
          </Spaced>
        </div>
      </Padded>
    </CalloutLinkWrap>
  </Spaced>
)

CalloutLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired
}

export default CalloutLink
