import React, { Component } from 'react';
import { Input, Spin, Alert } from 'antd';
import FilmCardList from '../FilmCardList/FilmCardList'
import CinemaService from '../services'
import { format } from 'date-fns'




export default class App extends Component {

    movies = new CinemaService
    state = { items: [], loaded: false, error: false }

    getMovies = () => {
        this.movies.apiResurses()
            .then(apiObj => {
                const elements = apiObj.results.map(item => {
                    return (
                        {
                            key: item.id,
                            name: item.title,
                            date: format(new Date(item.release_date), 'PP'),
                            overview: item.overview,
                            img: `https://image.tmdb.org/t/p/original${item.poster_path}`
                        }
                    )
                })
                return this.setState({ items: elements, loaded: true })
            })
            .catch(this.onError)
    }

    onError = (err) => {
        console.log(err)
        this.setState({ loaded: true, error: true })
    }

    render() {
        const { error, loaded, items } = this.state
        window.onload = this.getMovies
        return (
            <main className="filmCards">
                <Input placeholder="Search" />
                <h1>Популярное сегодня</h1>
                {error &&  <Alert message="Не получилось загрузить данные =(" type="error" showIcon />}
                {!loaded && <Spin />}
                {!(loaded && error) && < FilmCardList card={items} />}
            </main>
        );
    }
}


