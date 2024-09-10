
const Ticket=require('../Models/Ticket');
const Movie=require('../Models/Movie');

const bookTicket=async(req,res)=>{

    const {moviename,theatreName,numOfTickets,seatNumber,userId}=req.body

    const movie=await Movie.findOne({movieName:moviename,theatreName});
    if(!movie){
        return res.status(404).send({message:"Movie not found"})
    }
    if(movie.totalTickets<numOfTickets){
        return res.status(400).send({message:"Not enough tickets available"})
    }

    const ticket=await Ticket.create({moviename,theatreName,numOfTickets,seatNumber,userId});
    movie.totalTickets-=numOfTickets;
    if(movie.totalTickets===0){
        movie.status='SOLD OUT';
    }
    res.status(500).send({message:"Tickets booked successfully",payload:ticket})
}

const updateTicketStatus=async(req,res)=>{
    const {moviename,ticket}=req.params;
    const movie=await Movie.findOne({movieName:moviename});
    if(!movie){
        return res.status(404).send({message:"Movie not found"})
    }
    movie.totalTickets=ticket;
    if(ticket==0){
        movie.status='SOLD OUT';
    }
    else{
        movie.status='BOOK ASAP'
    }
    await movie.save();
    res.status(200).send({message:"Ticket status updated successfully",movie});

}

const deleteMovie=async(req,res)=>{
    const{moviename,id}=req.params;
    const movie=await Movie.findOneAndDelete({movieName:moviename,_id:id});
    if(!movie){
        return res.status(404).send({message:"Movie not found"})
    }
    res.status(200).send({messages:"Movie deleted succesfully"})
}

module.exports={bookTicket,updateTicketStatus,deleteMovie}