import React ,{useEffect, useState} from 'react'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios';
import './Row.css';
const baseURL = 'https://image.tmdb.org/t/p/original/';
function Row({ title ,fetchUrl , isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        }
       fetchData();
    }, [fetchUrl]);//if the bracket is empty, it will rin everytime the page is loaded,but if it is filled, it will run only when the movies array is changed
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        },
    }
    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            movieTrailer(movie?.name || movie?.title || movie?.original_name)
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => {console.log(error);})
        }
    }
    return (
    <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
            {movies.map(movie =>(
                <img
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                    src={`${baseURL}${isLargeRow? movie.poster_path: movie.backdrop_path}`} 
                    alt={movie.name}/>
            ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}

export default Row