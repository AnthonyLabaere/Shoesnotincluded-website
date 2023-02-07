import { faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components'

import LogoImg from '../../../public/images/logo.png'
import useCurrentUser from '../../hooks/useCurrentUser'
import Brand from './brand'

const UserName = styled.div`
  overflow: hidden;
  max-width: 15ch;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin-right: 10px;
`

const CustomNavbar = (): React.ReactElement => {
  const { user } = useCurrentUser()

  return (
    <Navbar
      sticky="top"
      expand="lg"
      collapseOnSelect
      style={{ backgroundColor: 'white' }}
    >
      <Container>
        <Navbar.Brand>
          <Link href="/" className="navbar-brand" style={{ display: 'flex' }}>
            <Image
              priority
              src={LogoImg}
              className="d-inline-block align-top"
              height={40}
              width={40}
              alt="ShoesNotIncluded logo"
            />
            <Brand className="fs-3" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link
              className="px-4"
              as={Link}
              href="/scenarios"
              eventKey="scenarios"
            >
              {'Les scénarios'}
            </Nav.Link>
            <Nav.Link
              className="px-4"
              as={Link}
              href="/comment-ca-marche"
              eventKey="comment-ca-marche"
            >
              {'Comment ça marche ?'}
            </Nav.Link>
            <Nav.Link className="px-4" as={Link} href="/tarif" eventKey="tarif">
              Tarif
            </Nav.Link>
            <Nav.Link className="px-4" as={Link} href="/faq" eventKey="faq">
              FAQ
            </Nav.Link>
            <Nav.Link
              className="px-4"
              as={Link}
              href="/team-building"
              eventKey="team-building"
            >
              {'Team building'}
            </Nav.Link>
            <Nav.Link
              className="px-4"
              as={Link}
              href="/compte"
              eventKey="compte"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <UserName>
                {user != null ? user.displayName : 'Mon compte'}
              </UserName>{' '}
              <FontAwesomeIcon
                icon={user != null ? faUser : faUserSlash}
                size="1x"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
