import React from 'react';

export default class CinemaService {

    constructor() {
        this.defURL = 'https://api.themoviedb.org/3/'
        this.apiKey = '?api_key=90d5e20a86b4ddbdf3739dbeffe07279'
        this.language = '&language=ru-RU'
    }

    async apiResurses(url, serchValue, page = 1) {
        const serch = `&query=${serchValue}`
        const pages = `&page=${page}`
        const res = await fetch(this.defURL + url + this.apiKey + this.language + pages + serch)
        if (!res.ok) throw new Error('Не удалось загрузить данные, попробуйте перезагрузить страницу')
        return await res.json()
    }

    async genresList() {
        const res = await fetch(`${this.defURL}genre/movie/list${this.apiKey}${this.language}`)
        if (!res.ok) throw new Error('Что то пошло не так')
        return await res.json()
    }

    async rateMovie(value, id, session_id) {
        const res = await fetch(`${this.defURL}movie/${id}/rating${this.apiKey}&guest_session_id=${session_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "value": value
            })
        });
        if (!res.ok) throw new Error('Не удалось оценить фильм')
        return await res.json()
    }

    async createGestSession() {
        const res = await fetch(`${this.defURL}authentication/guest_session/new${this.apiKey}`)
        if (!res.ok) throw new Error('Не удалось создать гостевую сессию')
        return await res.json()
    }

    async loadGestSessionRateMovies(session_id) {
        const res = await fetch(`${this.defURL}guest_session/${session_id}/rated/movies${this.apiKey}${this.language}`)
        if (!res.ok) throw new Error('Не удалось создать гостевую сессию')
        return await res.json()
    }
}

const {
    Provider: ProviderGeners,
    Consumer: ConsumerGeners
} = React.createContext();

export {
    ProviderGeners,
    ConsumerGeners
}