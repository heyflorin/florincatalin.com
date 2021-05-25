import React from 'react'
import PropTypes from 'prop-types'
import previewStyle from '../preview-style'

const AboutPagePreview = ({ entry, widgetsFor, getAsset }) => {
  const components = widgetsFor('components').getIn(['data', 'component'])
  const usages = widgetsFor('what-i-use').getIn(['data', 'usage'])
  const skills = widgetsFor('skillset').getIn(['data', 'skill'])
  const image = entry.getIn(['data', 'bioimage'])
  const imageAsset = getAsset(image).value

  return (
    <div style={previewStyle}>
      {imageAsset && (
        <img src={imageAsset} alt="" style={{ maxWidth: '100%' }} />
      )}
      <h1>{entry.getIn(['data', 'title'])}</h1>
      <p>{entry.getIn(['data', 'bio'])}</p>
      <h2>{entry.getIn(['data', 'components', 'title'])}</h2>
      {components && (
        <ul>
          {components.map((component, index) => (
            <li key={index}>
              <strong>{component.toJSON().name}</strong>:{' '}
              {component.toJSON().description}
            </li>
          ))}
        </ul>
      )}
      <h2>{entry.getIn(['data', 'what-i-use', 'title'])}</h2>
      {usages && (
        <dl>
          {usages.map((usage, index) => (
            <li key={index}>
              <strong>{usage.toJSON().name}</strong>:{' '}
              <a href={usage.toJSON().link}>{usage.toJSON().description}</a>
            </li>
          ))}
        </dl>
      )}
      <h2>{entry.getIn(['data', 'skillset', 'title'])}</h2>
      {skills && (
        <dl>
          {skills.map((skill, index) => (
            <li key={index}>{skill.toJSON().name}</li>
          ))}
        </dl>
      )}
    </div>
  )
}

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
    getAsset: PropTypes.func
  }),
  widgetFor: PropTypes.func,
  widgetsFor: PropTypes.func
}

export default AboutPagePreview
