import React from 'react'
import Root from './src/components/Root'

export const wrapRootElement = ({ element }) => {
  return (
    <Root className="test">{element}</Root>
  )
}
