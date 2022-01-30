import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

export default class FilmCard extends Component {



  render() {
    const { name, date, overview, img, id, count } = this.props;
    function FilmImg() {
      return <img src={img} alt={name}></img>;
    }

    function FilmTextH2() {
      return <h2 className='film-card_text__name'>{name}</h2>;
    }

    function FilmTextDate() {
      return <p className='film-card_text__date'>{date}</p>
    }

    function FilmTextGenre() {
      return <p className='film-card_text__genre'>"this.props"</p>
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
          <FilmTextGenre />
          <FilmTextTitle />
          <Rate value={count} count={10} onChange={(e) => this.props.onChangeFavorit(id, e)} allowClear={false} />
        </div>
      </li>
    );
  }
}
