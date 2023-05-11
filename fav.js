var a=JSON.parse(window.localStorage.getItem("favMovie"))
function onPageLoad(){
    for(let i=0;i<a.length;i++){
        fetchMovieByTitle(a[i])
    }
}
onPageLoad()

async function fetchMovieByTitle(id){
   
    const response=await fetch(`https://www.omdbapi.com/?i=${id}&apikey=b0729fb3`)
    const data=await response.json()
    const div=document.createElement("div")
    div.setAttribute("class","col-2")
    const li=document.createElement("li")
    li.setAttribute("class","col-10")
    li.innerHTML=
    `
    <div id="movieSection"  style="color:deepskyblue">
    <div id="movieName" style="color:whitesmoke;font-size:2rem"><span><b >Title : </b></span>${data.Title}</div>
    <div id="movieYear" style="color:whitesmoke"><span><b >Year : </b></span>${data.Year}</div>
    <div id="moviePoster">
    <img src="${data.Poster}">
    </div>
    <div id="moviePlot"><span><b style="color:whitesmoke">Plot : </b></span>${data.Plot}</div>
    <div id="director"><span><b style="color:whitesmoke">Director : </b></span>${data.Director}</div>
    <div id="writer"><span><b style="color:whitesmoke">Writer : </b></span>${data.Writer}</div>
    <div id="starts"><span><b style="color:whitesmoke">Stars : </b></span>${data.Stars}</div>
    <br>
    <div style="border-top:2px solid aliceblue"></div>
    </div>
    `
    // li.style.border="2px solid blue"
    div.innerHTML=
    `
    <button type="button" style="width:200px" id="removeFavBtn" name="btn" data-set=${data} >
    <img src="img/delete.png" alt="remove" style="background-color:" id="rem">
    </button>
    `
    // div.style.border="2px solid red"
    const movie=document.getElementById("favs")
    li.onclick=()=>{
        window.localStorage.setItem("movieSelected",data.imdbID)
        window.location.href="movie.html"
    }
    movie.append(li)
    movie.append(div)
    div.onclick=(e)=>{ 
        if(e.target.id=="removeFavBtn"||e.target.id=="rem"){
            const b=a.filter(x=>!x.includes(id))
            a=b
            window.localStorage.removeItem("favMovie")
            window.localStorage.setItem("favMovie",JSON.stringify(b))
            window.location.href="fav.html"
        }
       
    }
}






