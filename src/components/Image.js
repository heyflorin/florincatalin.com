import React, { useEffect, useMemo, useState } from 'react'

const Image = ({ src, alt, title }) => {
  const [markup, setMarkup] = useState('')

  // switch to dark version of image if using dark theme
  // NOTE: this relies on strict image naming convention
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchImage = async (src) => {
      try {
        const response = await fetch(src, {
          method: 'GET',
          signal
        })
        const text = await response.text()
        setMarkup(text)
      } catch (error) {
        console.error(error)
      }
    }

    if (src.endsWith('.svg')) {
      fetchImage(src)
    }

    return () => {
      controller.abort()
    }
  }, [src])

  const processedMarkup = useMemo(() => {
    return markup
      .replace(/#8D8DA6/g, 'var(--textLighter)')
      .replace(/#C1C1D2/g, 'var(--textLight)')
  }, [markup])

  return (
    <>
      {processedMarkup && (
        <div dangerouslySetInnerHTML={{ __html: processedMarkup }}/>
      )}
      <noscript>
        <img src={src} alt={alt}/>
      </noscript>
      {title && <figcaption>{title}</figcaption>}
    </>
  )
}

export default Image
