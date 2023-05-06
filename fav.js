const a=JSON.parse(window.localStorage.getItem("favMovie"))
for(let i=0;i<a.length;i++){
    fetchMovieByTitle(a[i])
}

async function fetchMovieByTitle(id){
   
    const response=await fetch(`https://www.omdbapi.com/?i=${id}&apikey=b0729fb3`)
    const data=await response.json()
    console.log(data)
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
    const movie=document.getElementById("favs")
    movie.append(li)

}



