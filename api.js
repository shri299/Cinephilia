

const getmovies = async(movies) =>{
    const base = "https://api.themoviedb.org/3/search/movie?api_key=3fc5c9bc9eb821a77072962390b0f15a&query=";
    const query = movies;
    const response = await fetch(base+query);
    const data = await response.json();
    return data;

}

// getmovies()
// .then(data=>{
//     console.log(data);
// })


const getmoviedetail = async(title)=>{
    const base = `https://www.omdbapi.com/?t=${title}&apikey=8b922f05`;
    const response = await fetch(base);
    const data = await response.json();
    return data;

}