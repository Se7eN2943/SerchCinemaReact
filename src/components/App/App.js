import React, { Component } from 'react';
import { Input, Spin, Alert, Tabs, Pagination } from 'antd';
import { format } from 'date-fns'
import FilmCardList from '../FilmCardList/FilmCardList'
import CinemaService, { debounce, ProviderGeners } from '../services'

export default class App extends Component {

    movies = new CinemaService

    state = { session: '', genres: [], items: [], value: '', loaded: false, error: false, onloaded: true, totalRes: 1, pages: 1 }

    componentDidMount = async () => {
        await this.movies.genresList().then(res => this.setState({ genres: res.genres }))
        sessionStorage.getItem('itemsFor') !== null && this.setState({ itemsFor: JSON.parse(sessionStorage.getItem('itemsFor')) })
        this.serchMovie()
        await this.movies.createGestSession().then(session => this.setState({ session: session.guest_session_id }))
    }

    rateMovieList = () => {
        this.setState({ loaded: false, error: false })
        this.movies.loadGestSessionRateMovies(this.state.session).then(movieOBJ => {
            const elements = movieOBJ.results.map(item => {
                if (!item.release_date) item.release_date = null
                else item.release_date = format(new Date(item.release_date), 'PP')
                if (!item.poster_path) item.poster_path = "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/e48bc3b5-24c9-46dd-9a05-2ae421830604/600x900"
                else item.poster_path = `https://image.tmdb.org/t/p/original${item.poster_path}`
                return (
                    {
                        key: item.id,
                        name: item.title,
                        date: item.release_date,
                        overview: item.overview,
                        img: item.poster_path,
                        count: item.rating,
                        average: item.vote_average,
                        genre: item.genre_ids
                    }
                )
            })
            return this.setState({ items: elements, loaded: true, totalRes: movieOBJ.total_results, pages: movieOBJ.page })
        })
            .catch(this.onError)
    }

    serchMovie = (pg) => {
        const { value, onloaded } = this.state
        if (onloaded || value.trim().length !== 0) {
            let url;
            if (onloaded) url = `movie/popular`
            else url = `search/movie`
            this.setState({ loaded: false, error: false })
            this.movies.apiResurses(url, value, pg)
                .then(apiObj => {
                    const elements = apiObj.results.map(item => {
                        if (!item.release_date) item.release_date = null
                        else item.release_date = format(new Date(item.release_date), 'PP')
                        if (!item.poster_path) item.poster_path = "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/e48bc3b5-24c9-46dd-9a05-2ae421830604/600x900"
                        else item.poster_path = `https://image.tmdb.org/t/p/original${item.poster_path}`
                        return (
                            {
                                key: item.id,
                                name: item.title,
                                date: item.release_date,
                                overview: item.overview,
                                img: item.poster_path,
                                count: item.rating,
                                average: item.vote_average,
                                genre: item.genre_ids
                            }
                        )
                    })
                    return this.setState({ items: elements, loaded: true, totalRes: apiObj.total_results, pages: apiObj.page })
                })
                .catch(this.onError)
        } else return this.setState({ items: [], loaded: true })
    }

    onChange = (event) => {
        this.setState({ value: event.target.value, onloaded: false })
    };

    onError = (err) => {
        console.error(err)
        this.setState({ loaded: true, error: true })
    }

    onChangeFavorit = (id, stars) => {
        this.movies.rateMovie(stars, id, this.state.session)
        const element = this.state.items.find(item => item.key === id)
        const localItems = JSON.parse(sessionStorage.getItem('items'))
        if (localItems !== null) {
            if (localItems.find(item => item.key === id)) {
                const mutLocalItems = localItems.map(item => {
                    if (item.key === id) item.count = stars
                    return item
                })
                sessionStorage.setItem('items', JSON.stringify(mutLocalItems))
            } else {
                element.count = stars
                sessionStorage.setItem('items', JSON.stringify(localItems.concat([element])))
            }
        } else {
            element.count = stars
            sessionStorage.setItem('items', JSON.stringify([element]))
        }
    }

    render() {
        const { TabPane } = Tabs;
        const { error, loaded, items, onloaded, totalRes, pages, value, genres } = this.state
        return (
            <ProviderGeners value={genres}>
                <main className="filmCards">
                    <Tabs onChange={(activeKey) => activeKey == "2" ? this.rateMovieList() : this.serchMovie()} defaultActiveKey="1" centered>
                        <TabPane tab="Поиск" key="1">
                            <Input autoFocus placeholder="Начните вводить название фильма"
                                type="text" value={this.state.value}
                                onInput={debounce(this.serchMovie, 500)}
                                onChange={this.onChange} />
                            {onloaded && <h1>Популярное сегодня</h1>}
                            {error && <Alert message="Не получилось загрузить данные =(" type="error" showIcon />}
                            {totalRes === 0 && <Alert message="Ничего не найдено" type="info" showIcon />}
                            {!loaded && <Spin />}
                            {(!error && loaded) && < FilmCardList card={items} onChangeFavorit={this.onChangeFavorit} />}
                            {loaded && totalRes > 20 && value.trim().length !== 0 &&
                                <Pagination
                                    showSizeChanger={false}
                                    pageSize={20}
                                    onChange={page => this.serchMovie(page)}
                                    size="small"
                                    total={totalRes}
                                    current={pages} />}
                        </TabPane>
                        <TabPane tab="Оцененные" key="2">
                            {!loaded && <Spin />}
                            {!(loaded && error) && < FilmCardList card={items} onChangeFavorit={this.onChangeFavorit} />}
                        </TabPane>
                    </Tabs>
                </main >
            </ProviderGeners >
        )
    }
}
