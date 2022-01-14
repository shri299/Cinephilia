document.addEventListener('DOMContentLoaded', getMovie);
const input = document.querySelector("#text").addEventListener("keyup",run);
const ul = document.querySelector("#list");
const poster = document.querySelector("#img");
const plot = document.querySelector("#plot");
const actors = document.querySelector("#actors");
const showNav = document.querySelector(".nav-wrapper");
const title = document.querySelector("#title");
const releaseDate = document.querySelector("#release");
const duration = document.querySelector("#duration");
const language = document.querySelector("#language");
const movieRating = document.querySelector("#rating"); 
const icon = document.querySelector("svg");
const svgwrap = document.querySelector("#icon");
const container = document.querySelector(".details-container");
const favourite = document.querySelector("#fav");
const topmovies = document.querySelector("#movies");
const topseries = document.querySelector("#series");
const hamburger = document.querySelector(".hamburger");
let hamstate = false;
hamburger.addEventListener('click', () => {
    if(!hamstate){
        showNav.classList.add('show-nav-mobile');
        hamstate = true;
    }
    else{
        showNav.classList.remove('show-nav-mobile');
        hamstate = false;
    }
});

let isLiked = false;
let ls;
function getMovie(){
    let url = window.location.href;
    let x = url.split('?n=');
    if(x.length > 1){
        x = x[1].split('$');
        x = x.join(' ');
        go(1, x);
    }
}
function run(e){
    if(e.target.value.length>0){
        getmovies(e.target.value)
        .then(data=>{
            let x = data.results;
            let arr = [];
            x.forEach(item=>{
                if(item.original_language === 'hi'){
                    arr.push(item.title);
                }
                else{
                    arr.push(item.original_title);
                }
            })
            showmovies(arr);
        })
    }
    else{
        ul.innerHTML = "";
        
        
    }
}


function showmovies(list){
    ul.innerHTML ="";
    list = list.filter((x, i) => i < 10);
    list.forEach(data=>{
        const li = document.createElement("li");
        li.addEventListener("click",go);
        li.textContent = data;
        li.classList.add("sub-list");
        ul.appendChild(li)
    });
}

function resetContainer(){
    let arr = [poster, plot, actors, title, releaseDate, duration, language, movieRating];
    arr.forEach(x => {
        x.innerHTML = "";
    });
}
function go(e, param){
    isLiked = false;
    ls = {};
    resetContainer();
    ul.innerHTML="";
    container.style.display = "flex";
    getmoviedetail(param || e.target.textContent)
    .then(data=>{
        const svg = '<svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path id="path" d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" fill="#ffc107"/></svg>'
        const image = document.createElement("img");
        svgwrap.innerHTML = svg;
        svgwrap.addEventListener("click",add);
        if(!checkLocal(data)){
            document.querySelector("#path").classList.add('liked');
            isLiked = true;
        }
        image.setAttribute("src",data.Poster);
        image.classList.add("poster");
        poster.appendChild(image);

        const about = document.createElement("p");
        about.textContent = data.Plot;
        plot.appendChild(about);

        const ttl = document.createElement("span");
        ttl.textContent = data.Title;
        title.appendChild(ttl);

        const act = document.createElement("span");
        let x = document.createElement('span');
        x.textContent = "Cast : ";
        act.appendChild(x);
        let text = document.createTextNode(data.Actors);
        act.appendChild(text);
        actors.appendChild(act);
      
        const date = document.createElement("span");
        x = document.createElement('span');
        x.textContent = "Released : ";
        date.appendChild(x);
        text = document.createTextNode(data.Released);
        date.appendChild(text);
        releaseDate.appendChild(date);

        const runtime = document.createElement("span");
        x = document.createElement('span');
        x.textContent = "Runtime : ";
        runtime.appendChild(x);
        text = document.createTextNode(data.Runtime);
        runtime.appendChild(text);
        duration.appendChild(runtime);


        const lang = document.createElement("span");
        x = document.createElement('span');
        x.textContent = "Language : ";
        lang.appendChild(x);
        text = document.createTextNode(data.Language);
        lang.appendChild(text);
        language.appendChild(lang);

        const rating = document.createElement("span");
        x = document.createElement('span');
        x.textContent = "Rating : ";
        rating.appendChild(x);
        text = document.createTextNode(data.imdbRating);
        rating.appendChild(text);
        movieRating.appendChild(rating);

         ls = {
                Poster:data.Poster,
                Plot:data.Plot,
                Title:data.Title,
                Caste:data.Actors,
                ReleaseDate:data.Released,
                Duration:data.Runtime,
                Language:data.Language,
                Rating:data.imdbRating
              }
    })
    
}
function checkLocal(data){
    let arr = JSON.parse(localStorage.getItem('userdata'));
    if(arr){
        let x = arr.filter(x => x.Title !== data.Title);
        return arr.length === x.length;
    }
    else{
        return true;
    }
}
function addtolocalStorage(data){
    let arr;
    arr = JSON.parse(localStorage.getItem('userdata'));
    if(arr){
        let newArr = arr.filter(x => x.Title !== data.Title);
        if(newArr.length === arr.length){
            arr.push(data);
            localStorage.setItem("userdata",JSON.stringify(arr));
        }
        else{
            localStorage.setItem("userdata",JSON.stringify(newArr));
        }
    }
    else{
        arr = [];
        arr.push(data);
        localStorage.setItem("userdata",JSON.stringify(arr));
    }
}
function add(e){
    if(!isLiked){
        document.querySelector("#path").classList.add('liked');
        isLiked = true;
        addtolocalStorage(ls);
        
    }
    else{
        document.querySelector("#path").classList.remove('liked');
        isLiked = false;
        addtolocalStorage(ls);
    }

    
}



