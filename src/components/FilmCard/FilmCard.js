import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import FilmCardGenre from './FilmCardGenre/FilmCardGenre';

export default class FilmCard extends Component {



  render() {

    const { name, date, overview, img, id, count, genre, average } = this.props;

    function FilmImg() {
      return <img src={img} alt={name}></img>;
    }

    function FilmTextH2() {
      let raitingStyle = ""
      if (average < 3) raitingStyle = "raiting raiting_03"
      if (average >= 3 && average < 5) raitingStyle = "raiting raiting_35"
      if (average >= 5 && average < 7) raitingStyle = "raiting raiting_57"
      if (average >= 7) raitingStyle = "raiting raiting_710"


      return (
        <div className="head">
          <h2 className='film-card_text__name'>{name}</h2>
          {average > 0 && <div className={raitingStyle}>{average}</div>}
        </div>
      )
    }


    function FilmTextDate() {
      return <p className='film-card_text__date'>{date}</p>
    }



    function FilmTextGenres() {
      return (
        <div className="film-card_text__genres">
          {genre.map(item => <FilmCardGenre genre={item} key={id + Math.random()} />)}
        </div>
      )
    }



    function FilmTextTitle() {
      return <p className="film-card_text__tittle">{overview}</p>
    }

    return (
      <li className="film-card">
        <div className="film-card_img">
          <FilmImg />
        </div>
        <div className="film-card_text">
          <FilmTextH2 />
          <FilmTextDate />
          <FilmTextGenres />
          <FilmTextTitle />
          <Rate value={count} count={10} onChange={(e) => this.props.onChangeFavorit(id, e)} allowClear={false} />
        </div>
      </li>
    );
  }
}
