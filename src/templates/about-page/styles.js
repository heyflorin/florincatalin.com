import styled from 'styled-components'
import { motion } from 'framer-motion'
import Image from 'gatsby-image'
import Text from '../../jh-ui/Text'
import Card from '../../jh-ui/Card'
import ContentWrap from '../../components/ContentWrap/'
import Heading from '../../jh-ui/Heading'

export const AboutSection = styled.section`
  background-color: var(--backgroundSecondary);
`

export const Section = styled(motion.section)``

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
    grid-column: 6 / span 8;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 6 / span 8;
  }
`

export const OverviewSection = styled.section`
  background-color: var(--backgroundSecondary);
`

export const OverviewSectionWrap = styled(motion.section)``

export const ProjectImageWrap = styled(motion.section)`
  grid-column: 2 / -2;
  box-shadow: ${({ theme, shadow }) =>
    shadow ? theme.elevations.high : 'unset'};
  border-radius: 12px;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 2 / -2;
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
    grid-column: 1 / span 3;
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

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing['2x']} !important;
  }

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
  height: calc(100% - 4.2px);
  grid-column: 2 / -2;
  box-shadow: ${({ theme, shadow }) =>
    shadow ? theme.elevations.high : 'unset'};
  border-radius: 12px;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    box-shadow: ${({ theme, shadow }) =>
      shadow ? theme.elevations.high : 'unset'};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
  }
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

export const HeaderWrap = styled.header`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  background-color: var(--backgroundPrimary);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

export const AboutContentWrap = styled(ContentWrap)`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  padding-bottom: ${({ theme }) => theme.spacing['3x']};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
    padding-bottom: ${({ theme }) => theme.spacing['4x']};
  }
`

export const HeaderContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-gap: 0 ${({ theme }) => theme.spacing['3x']};
  }
`

export const BioFigureWrap = styled.div`
  grid-column: 1 / -1;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
    margin-bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 2 / span 4;
  }
`

export const BioFigure = styled(motion.figure)`
  position: relative;
`

export const BioImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const BioImageBorder = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:first-of-type {
    transform: translate(-0.75rem, -0.75rem);
  }

  &:last-of-type {
    transform: translate(0.75rem, 0.75rem);
  }
`

export const BioText = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 5 / -1;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 6 / -2;
  }
`

export const ComponentsWrap = styled.section`
  background-color: var(--backgroundPrimary);
`

export const ComponentWrap = styled(motion.ul)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl} 0;
  grid-template-columns: repeat(12, 1fr);
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-gap: ${({ theme }) => theme.spacing.xxl};
  }
`

export const ComponentItemWrap = styled(motion.li)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 6;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 4;
  }
`

export const Component = styled(Card)`
  position: relative;
  height: 100%;
  background-color: var(--backgroundElevatedSecondary);
`

export const ComponentTitle = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
  }
`

export const ComponentDescription = styled(Text)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 6;
  }
`

export const UsesWrap = styled.section`
  background-color: var(--backgroundSecondary);
`

export const UsagesWrap = styled(motion.div)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
`

export const UsageWrap = styled(motion.div)`
  grid-column: auto / span 6;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 2;
  }
`

export const UsageExcerpt = styled(Card)`
  position: relative;
  height: 100%;
  background-color: var(--backgroundElevatedSecondary);
  text-align: center;
`

export const UsageLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const SkillsetWrap = styled.section`
  background-color: var(--backgroundInverse);
`

export const SkillsWrap = styled(motion.ul)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl} 0;
  grid-template-columns: repeat(12, 1fr);
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-gap: ${({ theme }) => theme.spacing.xxl};
  }
`

export const SkillWrap = styled(motion.li)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 4;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    grid-column: auto / span 3;
  }
`

export const Skill = styled(Card)`
  height: 100%;
  background-color: var(--backgroundElevatedInverse);

  h3 {
    color: var(--textInverse);
  }
`
