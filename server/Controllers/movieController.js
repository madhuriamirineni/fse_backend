const Movie = require('../Models/Movie')


const getAllMovies = async (req, res) => {
    const movies=await Movie.find({})
    res.status(200).send({message:"Fetched all movies",payload:movies})
    
}

const getMovieByName = async (req, res) => {
    const {moviename}=req.params;
    const movies=await Movie.find({movieName:new RegExp(moviename,'i')});
    if(movies.length===0){
        return res.status(404).send({message:"Movie not found"})
    }
    res.status(200).send({payload:movies})
}

const addMovie=async(req,res)=>{
  const movie=req.body;
  const newMovie=await Movie.create(movie);
  res.status(201).send({message:"movie added successfully",payload:newMovie})
}



module.exports = { getAllMovies,getMovieByName ,addMovie}