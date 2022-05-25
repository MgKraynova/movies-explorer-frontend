export default function FilterMovies(movies, request, isCheckboxChecked) {
    if (movies && request.length > 0) {
        return movies.filter((movie) => {
            if (isCheckboxChecked) {
                return movie.nameRU.toLowerCase().includes(request.toLowerCase()) && movie.duration <= 40;
            } else {
                return movie.nameRU.toLowerCase().includes(request.toLowerCase());
            }
        })
    } else if (request.length === 0) {
        return movies.filter((movie) => {
            if (isCheckboxChecked) {
                return movie.duration <= 40;
            } else {
                return movie;
            }
        })
    }
}