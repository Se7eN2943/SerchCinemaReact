import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../FilmCard/FilmCard';
import { ConsumerGeners } from '../services'

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
        < ConsumerGeners key={item.key} >
          {
            (genres) => {
              let ganres
              if (typeof item.genre[0] === 'string') ganres = item.genre
              else {
                ganres = item.genre.map(item => {
                  const genre = genres.filter(genre => genre.id === item)
                  return genre[0].name
                })
              }
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
                  genre={ganres}
                />
              )
            }
          }
        </ConsumerGeners >
      )
    })

    return (
      <ul className="filmCardList" > {cardElements}</ul >
    )
  }
}
