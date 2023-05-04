//map to store list of movies to each key
const movieMap=new Map()

//get ul elements
const list=document.getElementById('list')



let str=""
let movieTitle=""

//handle backspace
function handleBackspace(str){
    return str.substring(0,str.length-1)
}

//adding DOM element
function AddToDOM(movieKey){
    // const list=document.getElementById('list')

    const listMap=movieMap.get(movieKey)
    if(listMap!=null){
        for(let i=0;i<listMap.length;i++){
            const li=document.createElement('li')
            li.setAttribute("class","items")
            li.innerHTML=
            `
            ${listMap[i].title}
            `
            list.append(li)      
        }    
    }
    else{
        fetchFunction(movieKey)
    }
}

//rendor each movies 
function renderList(movieKey) { 
    AddToDOM(movieKey)
 }

 //resetting list element 
 function resetListElement() { 
    const items=document.getElementsByClassName("items")
    for(let count=items.length;count>0;count--){
        items[0].remove()
    }    
  }
 
 //fetching the result from the IMDB api collection 
async function fetchFunction(movieTitle) {
        const movieList=[]
        const response=await fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=b0729fb3`)
        const data=await response.json()
        if(data.Response=="True"){
        // console.log(data)
           for(let i=0;i<data.Search.length;i++){
            movie={
                title:null,
                year:null,
                id:null,
                type:null,
                poster:null
            }
            //setting the movie object
            movie.id=data.Search[i].imdbID
            movie.title=data.Search[i].Title
            movie.year=data.Search[i].Year
            movie.type=data.Search[i].Type
            movie.poster=data.Search[i].Poster
            //pushing movie objects to a movie List
            movieList.push(movie)
           }
           movieMap.set(movieTitle,movieList)
           resetListElement()
           renderList(movieTitle)
        }
        else{
            resetListElement()
        }
 }


 function handleKeyPress(e) {
    if(e.data==" "){
     return
    }
    const a=document.getElementById("s1").value
    fetchFunction(a.trim().replace(/  +/g, ' '))
 }

 //keyup
 document.getElementById('s1').addEventListener("input",handleKeyPress)


