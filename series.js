const top10series = ["Planet Earth II",
"Planet Earth",
"Band of Brothers",
"Breaking Bad",
"Chernobyl",
"The Wire",
"Blue Planet II",
"Our Planet",
"Cosmos: A Spacetime Odyssey",
" Cosmos",];

const topseries = document.querySelector(".series");
const hamburger = document.querySelector(".hamburger");
const showNav = document.querySelector(".nav-wrapper");
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

function getposters(){
    let promises=[];
    top10series.forEach(item=>{
        promises.push(fetch(`https://www.omdbapi.com/?t=${item}&apikey=8b922f05`));
        
    })
    return Promise.all(promises);
}


getposters()
.then(data => {
    let promises = [];
    data.forEach(x => {
        promises.push(x.json())
    })
    return Promise.all(promises);
})
.then(x=>{
   x.forEach(item=>{
    const li = document.createElement("li");
    li.addEventListener("click",back);
    li.textContent = item.Title;
    li.className = "movie-list-item";
    const image = document.createElement("img");
    image.setAttribute("src",item.Poster);
    li.appendChild(image);
    topseries.appendChild(li);
   });
});


function back(e){
    let x = e.target.textContent;
    let y = x.split(' ');
    if(y.length>1){
        y = y.join('$');
        window.location.href=`index.html?n=${y}`;
    }

    else{
        window.location.href = `index.html?n=${x}`;
    }

}


