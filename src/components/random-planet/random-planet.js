import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import PlanetContent from './random-planet-content';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  };

  onError = (err) => {
    this.setState({ error: true, loading: false });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 17) + 2;

    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error && <ErrorIndicator />;
    const spinner = loading && <Spinner />;
    const content = hasData && <PlanetContent planet={planet} />;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}
