// let movieObject=JSON.parse(window.localStorage.getItem("movieSelected"))
let movieObject=window.localStorage.getItem("movieSelected")




async function fetchMovieByTitle(){
    const response=await fetch(`https://www.omdbapi.com/?i=${movieObject}&apikey=b0729fb3`)
    const data=await response.json()
    // console.log(data)
    const li=document.createElement("li")
    li.innerHTML=
    `
    <div id="movieSection">
    <div id="movieName"><span>Title : </span>${data.Title}</div>
    <div id="movieYear"><span>Year : </span>${data.Year}</div>
    <div id="moviePoster">
    <img src="${data.Poster}">
    </div>
    <div id="moviePlot"><span>Plot : </span>${data.Plot}</div>
    <div id="director"><span>Director : </span>${data.Director}</div>
    <div id="writer"><span>Writer : </span>${data.Writer}</div>
    <div id="starts"><span>Stars : </span>${data.Stars}</div>
    `
    const movie=document.getElementById("movie")
    movie.append(li)

}
fetchMovieByTitle()
