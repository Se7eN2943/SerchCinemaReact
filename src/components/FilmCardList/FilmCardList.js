import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../FilmCard/FilmCard';

export default class FilmCardList extends Component {
  static propTypes = {
    card: PropTypes.arrayOf(PropTypes.object),
    onChangeFavorit: PropTypes.func
  }

  static defaultProps = {
    card: [],
    onChangeFavorit: () => { }
  }
  render() {
    const cardElements = this.props.card.map(item => {
      return (
        <FilmCard
          key={item.key}
          id={item.key}
          name={item.name}
          date={item.date}
          overview={item.overview}
          img={item.img}
          onChangeFavorit={this.props.onChangeFavorit}
          count={item.count}
          average={item.average}
          genre={item.genre}
        />
      )
    })
    return (
      < ul className="filmCardList" >{cardElements}</ul >
    )
  }
}
