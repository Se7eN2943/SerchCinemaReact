import React, { Component } from 'react';



export default class FilmCardGenre extends Component {

    render() {
        const { genre } = this.props
        return <div className='film-card_text__genre'>
            {!genre ? genre : genre[0].toUpperCase() + genre.slice(1)}
        </div>
    }

}