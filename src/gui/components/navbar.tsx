import React, { ReactElement } from 'react';
import styled from 'styled-components'
// import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons'

import useCurrentUser from '../../hooks/useCurrentUser';

import LogoImg from '../../assets/images/logo.png';
import Brand from './brand';
import { Link } from 'react-router-dom';
// import useLocale from '../../hooks/useLocale';
// import i18n from '../../i18n';

const UserName = styled.div`
  overflow: hidden;
  max-width: 15ch;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin-right: 10px;
`

const CustomNavbar = (): ReactElement => {
  // const { t } = useTranslation();

  // const { locale, shortLocale } = useLocale();

  // const changeLocale = (l: string): void => {
  //   if (locale !== l) {
  //     // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //     i18n.changeLanguage(l);
  //   }
  // };

  const { user } = useCurrentUser();

  return (
    <Navbar sticky="top" expand="lg" style={{ backgroundColor: 'white' }}>
      <Container>
        <Navbar.Brand href="/" style={{ display: 'flex' }}>
          <img
            src={LogoImg}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="ShoesNotIncluded logo"
          />
          <Brand className="fs-3" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                // TODO Ajouter une loupe
                placeholder={t('menu.search.placeholder')}
                className="me-2"
                aria-label="Search"
              />
            </Form> */}
            <Nav.Link className="px-4" as={Link} to="/scenarios">{"Les scénarios"}</Nav.Link>
            <Nav.Link className="px-4" as={Link} to="/enquoicaconsiste">{"En quoi ça consiste ?"}</Nav.Link>
            <Nav.Link className="px-4" as={Link} to="/tarif">Tarif</Nav.Link>
            <Nav.Link className="px-4" as={Link} to="/faq">FAQ</Nav.Link>
            <Nav.Link className="px-4" as={Link} to="/team-building">{"Team building"}</Nav.Link>
            <Nav.Link className="px-4" as={Link} to="/compte" style={{ display: 'flex', alignItems: 'center' }}>
              <UserName>{user ? user.displayName : "Mon compte"}</UserName> <FontAwesomeIcon icon={user ? faUser : faUserSlash} size="1x" />
            </Nav.Link>
            {/* <NavDropdown title={t(`menu.locale.${shortLocale}`)} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => changeLocale('fr')}>Français</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLocale('en')}>English</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;