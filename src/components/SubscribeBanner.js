import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ContentWrap from './ContentWrap'
import Padded from '../jh-ui/Padded'
import Button from '../jh-ui/Button'
import { addAlert } from '../helpers'
import X from '../img/icons/x.svg'
import Card from '../jh-ui/Card'
import Heading from '../jh-ui/Heading'
import Text from '../jh-ui/Text'
import Spaced from '../jh-ui/Spaced'
import Input from '../jh-ui/Input'
import ScreenReaderText from '../jh-ui/ScreenReaderText'
import Ul from '../jh-ui/Ul'
import Alert from '../jh-ui/Alert'

const SubscribeBannerWrap = styled.aside`
  position: relative;
  background-color: var(--backgroundSubscribeBanner);
`

const SubscribeContentWrap = styled.div`
  display: grid;
  grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
`

const SubscribeCard = styled(Card)`
  grid-column: 1 / -1;
  background-color: var(--backgroundInverse);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 2 / span 10;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 3 / span 8;
  }
`

const SubscribeCardContent = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;

    > * {
      flex: 1;
    }
  }
`

const SubscribeForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: var(--backgroundElevatedInverse);

  input {
    width: 100%;
  }
`

const CloseButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.m};
  right: ${({ theme }) => theme.spacing.m};
  color: var(--textLighter);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: ${({ theme }) => theme.spacing.m};
  }

  &:hover,
  &:focus {
    color: var(--textLight);
  }

  &:active {
    color: var(--textLighter);
  }
`

const SubscribeInput = styled(Input)`
  background-color: var(--backgroundInverse);
  color: var(--textInverse);
`

const SubscribeBanner = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [dismissed, setDismissed] = useState(true)
  const inputRef = useRef()

  useEffect(() => {
    const subscribeBannerDismissed = localStorage.getItem('subscribe-banner-dismissed')
    setDismissed(!!subscribeBannerDismissed)

    const handleShowSubscribe = () => {
      setDismissed(false)
    }

    window.addEventListener('showSubscribe', handleShowSubscribe)

    return () => {
      window.removeEventListener('showSubscribe', handleShowSubscribe)
    }
  }, [])

  const dismiss = event => {
    setDismissed(true)
    localStorage.setItem('subscribe-banner-dismissed', 'true')
    addAlert('Subscribe banner dismissed')
    event.target.blur()
  }

  const handleSubmit = async (event) => {
    setError(null)
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get('email')

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email
        })
      })

      const json = await response.json()

      if (!response.ok) {
        throw Error(json.detail)
      } else {
        setSuccess(true)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return !dismissed ? (
    <SubscribeBannerWrap id="subscribe" aria-labelledby="newsletter-label">
      <ContentWrap>
        <Padded vertical="3x">
          <SubscribeContentWrap>
            <SubscribeCard padding={false} hover={false}>
              <SubscribeCardContent>
                <Padded vertical="2x" bottom="xxl" horizontal="2x">
                  <div>
                    <Heading id="newsletter-label" level={4} element="h2" color="textInverse">
                      Subscribe to the newsletter
                    </Heading>
                    <Spaced top="xs">
                      <Text color="textInverse">
                        Sign up for periodic updates, including:
                      </Text>
                    </Spaced>
                    <Spaced top="m">
                      <Ul color="textInverse">
                        <li>New front-end experiments</li>
                        <li>CSS layout tricks and new properties</li>
                        <li>Insight into new JavaScript APIs</li>
                      </Ul>
                    </Spaced>
                  </div>
                </Padded>
                <SubscribeForm onSubmit={handleSubmit}>
                  <CloseButton unstyled type="button" onClick={dismiss}>
                    <X/>
                    <ScreenReaderText>
                      Dismiss newsletter subscription form
                    </ScreenReaderText>
                  </CloseButton>
                  <Padded top="4x" bottom="3x" horizontal="2x">
                    <div>
                      <div>
                        <label htmlFor="email" className="visually-hidden">
                          Enter your email address to subscribe to newsletter
                        </label>
                        <SubscribeInput
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Your email address"
                          ref={inputRef}
                        />
                      </div>
                      {error && (
                        <Spaced top="m">
                          <Alert>
                            {error}
                          </Alert>
                        </Spaced>
                      )}
                      {success && (
                        <Spaced top="m">
                          <Alert order="info">
                            You’ve been subscribed!
                          </Alert>
                        </Spaced>
                      )}
                      <Spaced top="m">
                        <Button order="accent" size="large">
                          Subscribe
                        </Button>
                      </Spaced>
                    </div>
                  </Padded>
                </SubscribeForm>
              </SubscribeCardContent>
            </SubscribeCard>
          </SubscribeContentWrap>
        </Padded>
      </ContentWrap>
    </SubscribeBannerWrap>
  ) : null
}

export default SubscribeBanner
