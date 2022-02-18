import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import { format } from 'date-fns'
import FilmCardGenre from './FilmCardGenre/FilmCardGenre';

export default class FilmCard extends Component {

  state = {
    count: 0
  }

  static propTypes = {
    name: PropTypes.string,
    date: PropTypes.null,
    overview: PropTypes.string,
    img: PropTypes.string,
    id: PropTypes.number,
    genre: PropTypes.array,
    average: PropTypes.number,
    onChangeFavorit: PropTypes.func
  }

  static defaultProps = {
    name: "Без названия",
    date: null,
    overview: "Нет описания фильма",
    img: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/e48bc3b5-24c9-46dd-9a05-2ae421830604/600x900",
    count: 0,
    id: 1,
    genre: ['Жанр не указан'],
    average: 0,
    onChangeFavorit: () => { }
  }

  checkCount = () => {
    const { id, count } = this.props
    if (this.props.count != 0) return this.setState({ count: count })
    const localItem = JSON.parse(sessionStorage.getItem('items'))
    if (localItem !== null) {
      localItem.forEach(item => {
        if (item.key === id && item.count !== undefined) return this.setState({ count: item.count })
      })
    }
  }

  changeStars = (e) => {
    const { id, onChangeFavorit } = this.props
    this.setState({ count: e })
    return onChangeFavorit(id, e)
  }


  componentDidMount = () => {
    this.setState({ count: this.props.count })
    this.checkCount()
  }

  render() {
    const { name, overview, id, genre, average } = this.props;
    let { date, img } = this.props
    function FilmImg() {
      return (
        <div className="film-card_img">
          <img
            src={img != null
              ? img = `https://image.tmdb.org/t/p/original${img}`
              : (img = "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/e48bc3b5-24c9-46dd-9a05-2ae421830604/600x900")}
            alt={name}>
          </img>
        </div>
      )
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
      console.log(date)
      return <p className='film-card_text__date'>{(!date || nul) ? null : date = format(new Date(date), 'PP')}</p>
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
        {window.visualViewport.width > 576 ? <FilmImg /> : null}
        <div className="film-card_text">
          <div className="mobile_card">
            {window.visualViewport.width <= 576 ? <FilmImg /> : null}
            <div className="film-card_text__wrapper">
              <FilmTextH2 />
              <FilmTextDate />
              <FilmTextGenres />
            </div>
          </div>
          <FilmTextTitle />
          <Rate value={this.props.count != 0 ? this.props.count : this.state.count} count={10} onChange={(e) => this.changeStars(e)} allowClear={false} />
        </div>
      </li>
    );
  }
}
