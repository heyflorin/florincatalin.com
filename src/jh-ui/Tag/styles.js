import styled from 'styled-components'

export const Root = styled.span`
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  background-color: var(--backgroundSecondary);
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: calc(${({ theme }) => theme.fontSizes.s.mobile} - 0.12rem);
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--textLighter);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: calc(${({ theme }) => theme.fontSizes.s.tablet} - 0.12rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: calc(${({ theme }) => theme.fontSizes.s.desktop} - 0.12rem);
  }

  &:hover,
  &:focus {
    ${({ hoverable }) =>
      hoverable === 'true'
        ? `
          background-color: var(--backgroundTertiary);
          cursor: pointer;
        `
        : ''}
  }
`
