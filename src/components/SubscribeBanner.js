import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentWrap from './ContentWrap'
import Padded from '../jh-ui/Padded'
import Text from '../jh-ui/Text'
import Button from '../jh-ui/Button'
import Spaced from '../jh-ui/Spaced'
import { addAlert } from '../helpers'
import X from '../img/icons/x.svg'

const SubscribeBannerWrap = styled.section`
  position: relative;
  background-color: var(--backgroundSubscribeBanner);
`

const CloseButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.l};
  right: ${({ theme }) => theme.spacing.m};
  color: var(--textLighter);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 50%;
    right: ${({ theme }) => theme.spacing.xl};
    transform: translateY(-50%);
  }

  &:hover,
  &:focus {
    color: var(--textLight);
  }

  &:active {
    color: var(--textLighter);
  }
`

const SubscribeBannerContentWrap = styled.div`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const SubscribeBanner = () => {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const subscribeBannerDismissed = localStorage.getItem('subscribe-banner-dismissed')
    setDismissed(!!subscribeBannerDismissed)
  }, [])

  const dismiss = event => {
    setDismissed(true)
    localStorage.setItem('subscribe-banner-dismissed', 'true')
    addAlert('Subscribe banner dismissed')
    event.target.blur()
  }

  return !dismissed ? (
    <SubscribeBannerWrap>
      <ContentWrap>
        <Padded vertical="xs">
          <SubscribeBannerContentWrap>
            <Spaced vertical="xs" right="m">
              <Text order="body">
                Sign up for periodic updates
              </Text>
              <Button>
                Subscribe
              </Button>
            </Spaced>
          </SubscribeBannerContentWrap>
        </Padded>
      </ContentWrap>
      <CloseButton unstyled onClick={dismiss}>
        <X/>
      </CloseButton>
    </SubscribeBannerWrap>
  ) : null
}

export default SubscribeBanner
