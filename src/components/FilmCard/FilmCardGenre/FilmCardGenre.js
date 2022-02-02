import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FilmCardGenre extends Component {

    static propTypes = {
        genre: PropTypes.string
    }

    static defaultProps = {
        genre: " "
    }

    render() {
        const { genre } = this.props
        return <div className='film-card_text__genre'>
            {!genre ? genre : genre[0].toUpperCase() + genre.slice(1)}
        </div>
    }

}