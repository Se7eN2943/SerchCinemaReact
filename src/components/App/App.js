import React, { Component } from 'react';
import { Input, Spin, Alert, Tabs, Pagination } from 'antd';
import FilmCardList from '../FilmCardList/FilmCardList'
import CinemaService, { debounce } from '../services'
import { format } from 'date-fns'




export default class App extends Component {

    movies = new CinemaService

    state = { items: [], loaded: false, error: false, value: '', onloaded: true }

    serchMovie = () => {
        console.log(this.state.loaded)
        this.setState({ loaded: false })
        console.log(this.state.loaded)
        let url;
        if (this.state.onloaded) url = `movie/popular`
        else url = `search/movie`
        if (this.state.value.trim().length !== 0 || this.state.onloaded) {
            this.movies
                .apiResurses(url, this.state.value)
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
                                img: item.poster_path
                            }
                        )
                    })
                    return this.setState({ items: elements, loaded: true })
                })
                .catch(this.onError)
        }
        return this.setState({ items: [], loaded: true })
    }


    onChange = (event) => {
        this.setState({ value: event.target.value, onloaded: false })
    };

    onError = (err) => {
        console.log(err)
        this.setState({ loaded: true, error: true })
    }

    render() {
        const { TabPane } = Tabs;
        const { error, loaded, items, onloaded } = this.state
        window.onload = this.serchMovie
        return (
            <main className="filmCards">
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Search" key="1">
                        <Input autoFocus placeholder="Search"
                            type="text" value={this.state.value}
                            onKeyUp={debounce(this.serchMovie, 500)}
                            onChange={this.onChange} />
                        {onloaded && <h1>Популярное сегодня</h1>}
                        {error && <Alert message="Не получилось загрузить данные =(" type="error" showIcon />}
                        {!loaded && <Spin />}
                        {!(loaded && error) && < FilmCardList card={items} />}
                        <Pagination size="small" total={50} />
                    </TabPane>
                    <TabPane tab="Rated" key="2">
                        <Pagination size="small" total={50} />
                    </TabPane>
                </Tabs>
            </main>
        );
    }
}


