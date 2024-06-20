import styled from 'styled-components'

import device from '../../config/device'

export default styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  > * {
    margin-right: 1rem;
  }
  h1 {
    flex-grow: 1;
    svg {
      color: ${props => props.theme.logo.color};
    }
    span {
      margin-left: 1rem;
      display: none;
    }
  }
  a,
  button {
    color: ${props => props.theme.color};
    display: flex;
    align-items: center;
  }
  button {
    background: none;
    border: none;
    padding: 0;
  }
  @media ${device.tablet} {
    h1 {
      span {
        display: inline;
      }
    }
  }
`
