var a=JSON.parse(window.localStorage.getItem("favMovie"))
// console.log(Object(a[0]))
function onPageLoad(){
    for(let i=0;i<a.length;i++){
        fetchMovieByTitle(a[i])
    }
}
onPageLoad()

async function fetchMovieByTitle(id){
   
    const response=await fetch(`https://www.omdbapi.com/?i=${id}&apikey=b0729fb3`)
    const data=await response.json()
    // console.log(data) const 
    const div=document.createElement("div")
    div.setAttribute("class","col-2")
    const li=document.createElement("li")
    li.setAttribute("class","col-10")
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
    div.innerHTML=
    `
    <button type="button" style="width:200px" id="removeFavBtn" name="btn" data-set=${data}>remove</button>
    `
    const movie=document.getElementById("favs")
    movie.append(li)
    movie.append(div)
    // const btn=document.getElementById("removeFavBtn")
    // removeFavBtn.addEventListener("click",handleRemove)
    div.onclick=(e)=>{ 
        if(e.target.id=="removeFavBtn"){
            // console.log(Number("tt4154664")==id)
            // const b=a.filter(x=>Number(x)!=id)
            const b=a.filter(x=>!x.includes(id))
            a=b
            // console.log(a)
            window.localStorage.removeItem("favMovie")
            window.localStorage.setItem("favMovie",JSON.stringify(b))
            // onPageLoad()
            window.location.href="fav.html"
        }
    }
}






