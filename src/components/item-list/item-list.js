import React, { Component } from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';

import './item-list.css';

export default class ItemList extends Component {
  swapiService = new SwapiService();

  state = {
    peropleList: null,
  };

  componentDidMount() {
    this.swapiService.getAllPeople().then((peropleList) => {
      this.setState({ peropleList });
    });
  }

  renderItems(arr) {
    return arr.map(({ id, name }) => (
      <li className="list-group-item" key={id} onClick={() => this.props.onItemSelected(id)}>
        {name}
      </li>
    ));
  }

  render() {
    const { peropleList } = this.state;

    if (!peropleList) {
      return <Spinner />;
    }

    const items = this.renderItems(peropleList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
