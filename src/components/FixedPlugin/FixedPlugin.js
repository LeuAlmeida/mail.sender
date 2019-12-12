import React, { Component } from 'react';

class FixedPlugin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: 'dropdown show-dropdown',
      color: '',
    };
  }

  componentDidMount() {
    const color = localStorage.getItem('color');

    if (color) {
      this.setState({ color: JSON.parse(color) });
    }

    color > 0
      ? document.body.classList.add('white-content')
      : document.body.classList.remove('white-content');
  }

  componentDidUpdate(_, prevState) {
    const { color } = this.state;

    if (prevState.color !== color) {
      localStorage.setItem('color', JSON.stringify(color));
    }
  }

  handleClick = () => {
    const { classes } = this.state;

    if (classes === 'dropdown show-dropdown') {
      this.setState({ classes: 'dropdown show-dropdown show' });
    } else {
      this.setState({ classes: 'dropdown show-dropdown' });
    }
  };

  activateMode = mode => {
    switch (mode) {
      case 'light':
        document.body.classList.add('white-content');
        this.setState({ color: 1 });
        break;
      default:
        document.body.classList.remove('white-content');
        this.setState({ color: 0 });
        break;
    }
  };

  render() {
    const { classes } = this.state;

    return (
      <div className="fixed-plugin">
        <div className={classes}>
          <div onClick={this.handleClick}>
            <i className="fa fa-cog fa-2x" />
          </div>
          <ul className="dropdown-menu show">
            <li className="header-title">CONFIGURAÇÕES</li>
            <li className="adjustments-line text-center color-change button-container">
              <span className="color-label">MODO CLARO</span>{' '}
              <span
                className="badge light-badge mr-2"
                onClick={() => this.activateMode('light')}
              />{' '}
              <span
                className="badge dark-badge ml-2"
                onClick={() => this.activateMode('dark')}
              />{' '}
              <span className="color-label">MODO ESCURO</span>{' '}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default FixedPlugin;
