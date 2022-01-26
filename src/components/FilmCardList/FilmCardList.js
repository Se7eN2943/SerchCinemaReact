import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import CinemaService from '../services'
import FilmCard from '../FilmCard/FilmCard';
import { format } from 'date-fns'

export default class FilmCardList extends Component {
  movies = new CinemaService
  state = { items: [], }

  getMovies() {
    this.movies.apiResurses().then(apiObj => {
      const elements = apiObj.results.map(item => {
        return (
          < FilmCard
            key={item.id}
            name={item.title}
            date={format(new Date(item.release_date), 'PP')}
            overview={item.overview}
            img={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          />
        )
      })
      return this.setState({ items: elements })
    })
  }



  render() {




    return (
      <main className="filmCards">
        <Input placeholder="Search" onChange={() => this.getMovies()} />
        <ul className="filmCardList">
          {this.state.items}
        </ul>
      </main>

    )


  }



}

