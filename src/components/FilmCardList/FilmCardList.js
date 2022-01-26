import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../FilmCard/FilmCard';

export default class FilmCardList extends Component {

  state = { items: [], }

  render() {
    const { apiResurses } = this.props;

    const append = setTimeout(() => {
      apiResurses().then(apiObj => {
        const elements = apiObj.results.map(item => {
          return (
            < FilmCard
              key={item.id}
              name={item.title}
              date={item.release_date}
              overview={item.overview}
              img={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            />
          )
        })
        return this.setState({ items: elements })
      })
    }, 5000)



    return (
      <ul className="filmCardList">
        {this.state.items}
      </ul>
    )


  }



}

