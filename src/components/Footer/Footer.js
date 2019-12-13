import React from 'react';

import { Container, Nav, NavItem, NavLink } from 'reactstrap';

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="http://educacaometodista.org.br/" target="_blank">
              Educação Metodista
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="https://github.com/educacaometodista"
              target="_blank"
            >
              Repositórios
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} Desenvolvido pela{' '}
          <a
            href="https://github.com/educacaometodista"
            rel="noopener noreferrer"
            target="_blank"
          >
            Educação Metodista.
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
