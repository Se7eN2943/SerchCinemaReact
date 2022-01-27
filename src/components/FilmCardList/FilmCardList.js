import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../FilmCard/FilmCard';



export default class FilmCardList extends Component {




  render() {
    const cardElements = this.props.card.map(item => {
      return (
        <FilmCard
          key={item.key}
          name={item.name}
          date={item.date}
          overview={item.overview}
          img={item.img}
        />
      )
    })
    return (
      < ul className="filmCardList" >
        {cardElements}
      </ul >
    )
  }
}

