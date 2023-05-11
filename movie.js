// let movieObject=JSON.parse(window.localStorage.getItem("movieSelected"))
let movieObject=window.localStorage.getItem("movieSelected")




async function fetchMovieByTitle(){
    const response=await fetch(`https://www.omdbapi.com/?i=${movieObject}&apikey=b0729fb3`)
    const data=await response.json()
    // console.log(data)
    const li=document.createElement("li")
    li.innerHTML=
    `
    <div id="movieSection" style="color:blue";font-size:2rem">
    <div id="movieName" style="color:whitesmoke;font-size: 3em;"><span style="color:white"><b>  </b></span>${data.Title}</div>
    
    <div id="movieYear" style="color:;"><span style="color:white"><b>Year : </b></span>${data.Year}</div>
    <div id="moviePoster">
    <img src="${data.Poster}">
    </div>
    <div id="moviePlot" ><span style="color:white"><b>Plot : </b></span>${data.Plot}</div>
    <div style="border-top:1px solid whitesmoke"></div>
    <div id="director" ><span style="color:white"><b>Director : </b></span>${data.Director}</div>
    <div style="border-top:1px solid white"></div>
    <div id="writer" ><span style="color:white"><b>Writer : </b></span>${data.Writer}</div>
    <div style="border-top:1px solid white"></div>
    <div id="starts" ><span style="color:white"><b>Stars : </b></span>${data.Stars}</div>
    <div style="border-top:1px solid white"></div>
    `
    li.style.fontFamily=""
    const movie=document.getElementById("movie")
    // movie.style.border="2px solid cyan"
    movie.append(li)

}
fetchMovieByTitle()
