/*
 * RenderComponent
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import * as Components from '../../components';

export default class RenderComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.component = Components[this.props.params.component];
  }

  render() {
    const element = React.createElement(this.component, this.props, null);
    return element;
  }
}

RenderComponent.PropTypes = {
  params: React.PropTypes.object,
};

