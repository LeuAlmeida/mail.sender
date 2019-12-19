import React from 'react';
import { Route, Switch } from 'react-router-dom';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

// core components
import routes from '../../routes';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import FixedPlugin from '../../components/FixedPlugin/FixedPlugin';

import logo from '../../assets/img/logo.png';

let ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'blue',
      sidebarOpened:
        document.documentElement.className.indexOf('nav-open') !== -1,
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      const tables = document.querySelectorAll('.table-responsive');
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.documentElement.className += ' perfect-scrollbar-off';
      document.documentElement.classList.remove('perfect-scrollbar-on');
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      if (navigator.platform.indexOf('Win') > -1) {
        const tables = document.querySelectorAll('.table-responsive');
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            disabled={prop.disabled}
          />
        );
      }
      return null;
    });
  };

  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return 'Disparador de E-mails';
  };

  render() {
    const { location } = this.props;
    const { backgroundColor, sidebarOpened } = this.state;

    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={backgroundColor}
            logo={{
              outterLink: 'https://github.com/educacaometodista',
              text: 'Metodista',
              imgSrc: logo,
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div className="main-panel" ref="mainPanel" data={backgroundColor}>
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={sidebarOpened}
            />
            <Switch>{this.getRoutes(routes)}</Switch>
          </div>
        </div>
        <FixedPlugin
          bgColor={backgroundColor}
          handleBgClick={this.handleBgClick}
        />
      </>
    );
  }
}

export default Admin;
