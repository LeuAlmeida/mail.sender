import React from 'react';
import classNames from 'classnames';
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
} from 'reactstrap';

import api from '../../services/api';

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      user: '',
      collapseOpen: false,
      color: 'navbar-transparent',
    };
  }

  async componentDidMount() {
    window.addEventListener('resize', this.updateColor);

    const { userId } = this.state;

    const users = await api.get(`/users`);

    this.setState({ user: users.data.find(u => u.id === userId) });

    console.log(this.state.user.avatar_url);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateColor);
  }

  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: 'bg-white',
      });
    } else {
      this.setState({
        color: 'navbar-transparent',
      });
    }
  };

  toggleCollapse = () => {
    const { collapseOpen } = this.state;

    if (collapseOpen) {
      this.setState({
        color: 'navbar-transparent',
      });
    } else {
      this.setState({
        color: 'bg-white',
      });
    }
    this.setState({
      collapseOpen: !collapseOpen,
    });
  };

  render() {
    const { user, color, collapseOpen } = this.state;
    const { sidebarOpened, toggleSidebar, brandText } = this.props;

    return (
      <>
        <Navbar className={classNames('navbar-absolute', color)} expand="lg">
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames('navbar-toggle d-inline', {
                  toggled: sidebarOpened,
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {brandText}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={collapseOpen}>
              <Nav className="ml-auto" navbar>
                <InputGroup className="search-bar" />
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                  >
                    <div className="notification d-none d-lg-block d-xl-block" />
                    <i className="tim-icons icon-bell-55" />
                    <p className="d-lg-none">Notifications</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Mike John responded to your email
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        You have 5 more tasks
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Your friend Michael is in town
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Another notification
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Another one
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <div className="photo">
                      <img alt={user.name} src={user.avatar_url} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Configurações
                      </DropdownItem>
                    </NavLink>
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Sair</DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
