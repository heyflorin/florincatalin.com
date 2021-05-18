import styled from 'styled-components'
import { motion } from 'framer-motion'
import Text from '../../jh-ui/Text'
import Heading from '../../jh-ui/Heading'
import Button from '../../jh-ui/Button'

export const ProjectWrap = styled.div`
  flex: 1;
  background-color: var(--backgroundPrimary);
`

export const Header = styled.header`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

export const Section = styled(motion.section)`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-bottom: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing['4x']} 0;
  }
`

export const SectionContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

export const SectionTitle = styled(Heading)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 1 / span 5;
    margin-bottom: ${({ theme }) => theme.spacing['3x']} !important;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 2 / span 3;
  }
`

export const SectionDescription = styled(Text)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 6 / span 6;
    margin-bottom: ${({ theme }) => theme.spacing['3x']} !important;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 6 / span 6;
  }
`

export const OverviewSection = styled(motion.section)`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing['4x']} 0;
    padding-bottom: 0;
  }
`

export const OverviewContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

export const OverviewGrid = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 1 / span 4;
    ${'' /* margin-bottom: ${({ theme }) => theme.spacing['3x']} !important; */}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 2 / span 3;
  }
`

export const OverviewKey = styled(Text)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 1 / span 4;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 1 / span 3;
  }
`

export const OverviewValue = styled(Text)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 1 / span 4;
    margin-bottom: ${({ theme }) => theme.spacing['3x']} !important;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 1 / span 3;
  }
`

export const OverviewDescription = styled(Text)`
  display: grid;
  grid-template-columns: 1fr;
  grid-column: 1 / -1;
  grid-row: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-row: auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 6 / span 6;
    ${'' /* margin-bottom: ${({ theme }) => theme.spacing['3x']} !important; */}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 6 / span 6;
  }
`

export const SectionImageWrap = styled.div`
  grid-column: 1 / -1;
  box-shadow: ${({ theme, shadow }) =>
    shadow ? theme.elevations.high : 'unset'};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 2 / -2;
  }
`

export const SectionImageCaptionWrap = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 2 / -2;
  }
`

export const LightThemeAlertWrap = styled(motion.div)`
  position: fixed;
  left: 50%;
  bottom: 1rem;
  width: 100%;
`

export const LightThemeAlert = styled.div`
  background-color: var(--backgroundSecondary);
  border-radius: 6px;
  color: var(--text);

  button {
    height: auto;
    border: 0;
    background-color: transparent;
    text-decoration: underline;
    color: var(--text);

    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
      color: var(--text);
    }
  }
`

export const ThemeAlertContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CloseButton = styled(Button)`
  height: auto;
  margin-left: auto;
  padding: 0.3rem;
  border: 0;
  background-color: var(--backgroundTertiary);
  color: var(--text);
`
