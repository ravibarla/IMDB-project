//map to store list of movies to each key
const movieMap=new Map()

//get ul elements
const list=document.getElementById('list')

//get mainElement 
const mainElement=document.getElementById("main")

let str=""
let movieTitle=""

document.getElementById("main").innerHTML=
`
<div style="font-family: 'Merriweather', serif;font-size:40px;color: rgba(152, 152, 10, 0.613);">
please search for your movies . . . .
</div>
`

//handle list click
function handleListCLick(e) { 
    let targetString=e.currentTarget.dataset.id
    let targetJson=JSON.parse(e.currentTarget.dataset.id)
    window.localStorage.setItem("movieSelected",targetJson.id)
    window.location.href="movie.html"
 }

//adding DOM element to list
function AddToDOMList(movieKey){
    const listMap=movieMap.get(movieKey)
    if(listMap!=null){
        for(let i=0;i<listMap.length;i++){
            const li=document.createElement('li')
            li.setAttribute("class","items ")
            let dataId=JSON.stringify(listMap[i])
            li.innerHTML=
            `
            ${listMap[i].title}
            `
            li.setAttribute("data-id",dataId)
            li.addEventListener("click",handleListCLick)
            list.append(li)      
        }    
    }
    else{
        fetchFunction(movieKey)
    }
}



//adding DOM element to Div
function AddToDOMDiv(movieKey){
    const listMap=movieMap.get(movieKey)
    if(listMap!=null){
        
        document.getElementById("main").innerHTML=
        `
        <div style="font-family: 'Merriweather', serif;font-size:40px;color: rgba(152, 152, 10, 0.613);">
        Search for movie : ${movieKey}
        </div>
        
        `
        
        for(let i=0;i<listMap.length;i++){
            const li=document.createElement('li')
            const favElement=document.createElement('div')
            const divElement=document.createElement('div')
            li.setAttribute("class","items  p-2 col-10")
            li.innerHTML=
            `
            <div>${listMap[i].title}</div>
            <div>${listMap[i].year}</div>
            <div>${listMap[i].type}</div>
            <div>
            <img src="${listMap[i].poster}" alt="image not available">
         
            </div>
            <div style="border-top:1px solid white">
            
            
            `
            // mainElement.style.border="2px solid green"
            // <button type="button" style="width:200px" id="favBtn" name="btn">
            favElement.innerHTML=
            `
            <button type="button" style="width:200px" id="favBtn" name="btn">
            <img id="fav" src="img/add.png" style="position:relative">
            </button>
            `
            favElement.onclick=(e)=>{ 
                var a=new Set()
                var b=[]
                if(e.target.id=="favBtn"){
                    // console.log(e.target)
                    a=movieSet.add(listMap[i].id)
                    b=Array.from(a)    
                    e.target.setAttribute("id","removeFavBtn")
                    // e.target.innerHTML="remove"
                    e.target.innerHTML=
                    `
                    <img id="rem" src="img/delete.png">
                    `
                    window.localStorage.setItem("favMovie",JSON.stringify(b))
                }
                
                else if(e.target.id=="removeFavBtn"){
                
                    e.target.setAttribute("id","favBtn"||e.target.id=="fav")
                    // e.target.innerHTML="fav"
                    e.target.innerHTML=
                    `
                    <img id="fav" src="img/add.png">
                    `
                    // e.target.setAttribute("id","rem")
                    // e.target.setAttribute("src","img/delete.png")
                    movieSet.delete(listMap[i].id)
                    a=movieSet
                    b=Array.from(a)
                    window.localStorage.setItem("favMovie",JSON.stringify(b))
                    
                }
                else if(e.target.id=="fav"){
               
                    a=movieSet.add(listMap[i].id)
                    b=Array.from(a)    
                    e.target.setAttribute("id","rem")
                    e.target.setAttribute("src","img/delete.png")
                   
                    window.localStorage.setItem("favMovie",JSON.stringify(b))
                }
                else if(e.target.id=="rem"){
               
              
                    e.target.setAttribute("id","favBtn")
                  
                    e.target.setAttribute("id","fav")
                    e.target.setAttribute("src","img/add.png")
                    movieSet.delete(listMap[i].id)
                    a=movieSet
                    b=Array.from(a)
                    window.localStorage.setItem("favMovie",JSON.stringify(b))
                }
            }
            favElement.setAttribute("class","col-2")
            // favElement.style.border="2px solid red"
            mainElement.append(li)      
            mainElement.append(favElement)
            li.onclick=()=>{
                window.localStorage.setItem("movieSelected",listMap[i].id)
                window.location.href="movie.html"
            }
        
        } 
    }
    else{
        fetchFunction(movieKey)
    }
}


var movieSet=new Set()
function handleFavCLick(movieId) {
    movieSet.set(movieId)
    window.localStorage.setItem("favMovie",movieSet)
}

//rendor each movies 
function renderList(movieKey,element) { 
    if(element=="list"){
        AddToDOMList(movieKey)
    }
    if(element=="div"){
        AddToDOMDiv(movieKey)
    }
 }


 //resetting list element 
 function resetListElement() { 
    const items=document.getElementsByClassName("items")
    for(let count=items.length;count>0;count--){
        items[0].remove()
    }    
}


//reset DIV elements
function resetDivElement(){
    const mainElement=document.getElementById("main")

    while (mainElement.firstChild) {
        mainElement.removeChild(mainElement.lastChild);
      }
}

 //fetching the result from the IMDB api collection 
async function fetchFunction(movieTitle) {
        const movieList=[]
        const response=await fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=b0729fb3`)
        const data=await response.json()
        if(data.Response=="True"){
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
           resetDivElement()
           movieMap.set(movieTitle,movieList)
           resetListElement()
           renderList(movieTitle,"list")
        }
        else{
            resetListElement()
        }
 }

var inputKeyWithoutWhiteSpace=""
 function handleKeyPress(e) {
    const inputKeyPress=document.getElementById("s1").value
    inputKeyWithoutWhiteSpace=inputKeyPress.trim().replace(/  +/g, ' ')
    
    fetchFunction(inputKeyPress.trim().replace(/  +/g, ' '))
 }


 

 //keyup
 document.getElementById('s1').addEventListener("input",handleKeyPress)



 document.getElementById('searchButton').addEventListener("click",function(){
    resetListElement()
    resetDivElement()
    renderList(inputKeyWithoutWhiteSpace,"div")
 })



//handle backspace
// function handleBackspace(e){
//     if(e.key=="Backspace"){
//         resetDivElement()
//     }
//     handleKeyPress()
//     // return str.substring(0,str.length-1)
// }