import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'
import UserLinks from '../Utility/UserLinks'

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: ${props => props.theme.brand};
  
  .nav-link {
    font-size: 1.6rem;
    margin-right: 10px;
    font-weight: 200;
    color: black;
  }
`

class Navigation extends React.Component {

  render() {
    return (
      <NavContainer>
        <section>
          <Link className='nav-link' to='/' > HOME </Link>
          <Link className='nav-link' to='/dart-for-web-developers' > LESSONS </Link>
          <Link className='nav-link' to='/about' > ABOUT </Link>
        </section>
        <UserLinks />
      </NavContainer>
    )
  }
}

export default Navigation