export default class CinemaService {
    async apiResurses() {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=90d5e20a86b4ddbdf3739dbeffe07279`)
        if (!res.ok) throw new Error('Что то пошло не так')
        return await res.json()
    }
}