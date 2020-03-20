import React from 'react'
import { oneOf } from 'prop-types'
import styled from 'styled-components'

const getBackgroundColor = order => {
  switch (order) {
    case 'info':
      return 'var(--backgroundAlertInfo)'

    case 'warning':
    case 'danger':
    default:
      return 'var(--backgroundAlertDanger)'
  }
}

const getTextColor = order => {
  switch (order) {
    case 'info':
      return 'var(--textAlertInfo)'

    case 'warning':
    case 'danger':
    default:
      return 'var(--textAlertDanger)'
  }
}

const Root = styled.div`
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  background-color: ${({ order }) => getBackgroundColor(order)};
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.s.mobile};
  line-height: 1.4;
  color: ${({ order }) => getTextColor(order)};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.s.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.s.desktop};
  }
`

const Alert = ({ children, order, ...props }) => (
  <Root order={order} {...props}>
    {children}
  </Root>
)

Alert.propTypes = {
  order: oneOf(['info', 'warning', 'danger'])
}

Alert.defaultProps = {
  order: 'danger'
}

export default Alert
