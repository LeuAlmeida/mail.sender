import React, { Component } from 'react';

class EditSenders extends Component {
  state = {};

  componentDidMount() {
    const { history } = this.props;

    const { state: id } = history.location;

    console.log(id);
  }

  render() {
    return <></>;
  }
}

export default EditSenders;
