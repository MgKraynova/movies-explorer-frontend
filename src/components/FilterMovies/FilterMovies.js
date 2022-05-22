export default function FilterMovies(movies, request, isCheckboxChecked) {
    let filteredMovies = [];
    if (request) {
        filteredMovies = movies.filter((movie) => {
            // console.log('movie', movie);
            // console.log('request.toLowerCase()', request.toLowerCase());
            if (isCheckboxChecked) {
                return movie.nameRU.toLowerCase().includes(request.toLowerCase()) && movie.duration <= 40;
            } else {
                return movie.nameRU.toLowerCase().includes(request.toLowerCase());
            }
        })
    } else {
        filteredMovies = movies.filter((movie) =>{
            if (isCheckboxChecked) {
                return movie.duration <= 40;
            } else {
                return movie;
            }
        })
    }

    console.log('filteredMovies', filteredMovies);
    return filteredMovies;
}