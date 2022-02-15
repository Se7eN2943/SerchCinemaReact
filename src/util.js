function debounce(fn, debounceTime) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), debounceTime)
    }
};

function mutationData(movieOBJ) {
    return movieOBJ.results.map(item => {
        return ({
            key: item.id,
            name: item.title,
            date: item.release_date,
            overview: item.overview,
            img: item.poster_path,
            count: item.rating,
            average: item.vote_average,
            genre: item.genre_ids
        })
    })
}



export default debounce
export {
    mutationData
}