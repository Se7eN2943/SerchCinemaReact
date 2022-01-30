export default class CinemaService {
    async apiResurses(url, serchValue, page = 1) {
        const serch = `&query=${serchValue}`
        const defURL = 'https://api.themoviedb.org/3/'
        const apiKey = '?api_key=90d5e20a86b4ddbdf3739dbeffe07279'
        const lg = '&language=ru-RU'
        const pages = `&page=${page}`
        const res = await fetch(defURL + url + apiKey + lg + pages + serch)
        if (!res.ok) throw new Error('Что то пошло не так')
        return await res.json()
    }


}


const debounce = (fn, debounceTime) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), debounceTime)
    }
};

export {
    debounce
}