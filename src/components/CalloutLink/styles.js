import styled from 'styled-components'
import Card from '../../jh-ui/Card'

export const CalloutLinkWrap = styled(Card)`
  position: relative;
  background-color: var(--backgroundCode);
  border-radius: 6px;
  grid-column: 2 / -2;

  > div {
    display: flex;
    align-items: stretch;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 1 / -1;
  }
`

export const CalloutLinkLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:focus {
    box-shadow: none;
  }
`

export const CalloutLinkFigure = styled.figure`
  display: none;
  position: relative;
  background-color: var(--backgroundTertiary);
  color: var(--accent);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 8rem;
  }
`
