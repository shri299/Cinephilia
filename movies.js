const topMovie = [
    "The Shawshank Redemption", "The Godfather", "The Godfather: Part II", "The Dark Knight", "12 Angry Men", "Schindler's List", "Pulp Fiction", "The Lord of the Rings: The Return of the King", 
    "The Good, the Bad and the Ugly", "Fight Club"]

const top10movies = document.querySelector(".new-list");

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
function getPosters(){
    let promises = [];
    topMovie.forEach(item => {
        promises.push(fetch(`https://www.omdbapi.com/?t=${item}&apikey=8b922f05`));
    });
    return Promise.all(promises);
}
getPosters()
.then(data => {
    // let posters = [];
    let promises = [];
    data.forEach(x => {
        promises.push(x.json())
    })
    return Promise.all(promises);
})
.then(x => {
    x.forEach(item=>{
        const li = document.createElement("li");
        li.addEventListener('click', back);
        const img = document.createElement('img');
        li.textContent = item.Title;
        li.className = "movie-list-item";
        img.setAttribute("src", item.Poster);
        li.appendChild(img);
        top10movies.appendChild(li);
    });
})
function back(e){
    console.log(e.target.textContent);
    let x = e.target.textContent;
    let y = x.split(' ');
    if(y.length > 1){
        y = y.join('$');
        window.location.href = `index.html?n=${y}`;
    }
    else{
        window.location.href = `index.html?n=${x}`;
    }
}