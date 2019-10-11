import React from 'react'
import { withKnobs, select, text } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrapper from '../ThemeWrapper'
import ThemeContext from '../../context/theme'
import Text from './index'

export default {
  title: 'Text',
  decorators: [
    renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const order = select('Order', ['body', 'caption', 'meta'], 'body')
  const element = text('Element', '')

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Text theme={theme} order={order} element={element}>
          This is some text
        </Text>
      )}
    </ThemeContext.Consumer>
  )
}

export const Multiline = () => {
  const order = select('Order', ['body', 'caption', 'meta'], 'body')
  const element = text('Element', '')

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div style={{width: "400px"}}>
          <Text theme={theme} order={order} element={element}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus nunc ac condimentum pellentesque. Sed in sem sed eros ornare feugiat et sit amet ligula. Maecenas velit massa, convallis sit amet iaculis ac, aliquet id lorem. Suspendisse rutrum rhoncus augue sed tempus. Duis in rhoncus nisi. In mollis rhoncus purus, varius iaculis purus rhoncus eget. Morbi lectus ligula, tempus sed est sit amet, pulvinar sodales nulla. Nunc at risus sodales, interdum quam ut, suscipit nisl. Proin sagittis, lacus ut tincidunt interdum, tellus est maximus est, at mollis ante urna id velit. Morbi laoreet in sapien sed posuere. Pellentesque malesuada sapien at euismod sodales. Aliquam malesuada ex diam, rhoncus venenatis augue iaculis et.
          </Text>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}
