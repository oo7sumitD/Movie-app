const ApiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"

const searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const ImgPath = "https://image.tmdb.org/t/p/w1280";
const main =document.getElementById("main")

const form = document.getElementById("form")
const search = document.getElementById("search")

getMovies(ApiUrl)
async function getMovies(url)
{
    const response = await fetch(url)
    const responseData = await response.json()

    console.log(responseData);

    addMovies(responseData.results)

}


function addMovies(movies)
{
    main.innerHTML = ""

    movies.forEach((movie) => {
        const {poster_path,title,vote_average,overview} = movie
    
        const movieEl = document.createElement("div")
    
        movieEl.classList.add("movie")
    
        movieEl.innerHTML = ` 
        <img src="${ImgPath+poster_path}"
         alt="${title}"/>
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>${title} Overview:</h3>
            ${overview}
        </div>`
        
        main.appendChild(movieEl)
    });

}

function getClassByRate(vote)
{
    if(vote >= 8)
    {return "green"}

    else if(vote >=5)
    {return "orange"}

    else{return "red"}
}

form.addEventListener("submit",(event)=>{
    event.preventDefault()

    const searchTerm = search.value

    if(searchTerm)
    {
        getMovies(searchApi + searchTerm)
        search.value = ""
    }

})