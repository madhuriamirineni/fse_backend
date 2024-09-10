
const express=require('express');
const ticketApp=express.Router();

const {bookTicket,updateTicketStatus,deleteMovie}=require('../Controllers/ticketControllers');
const expressAsyncHandler = require('express-async-handler');
const verifyToken=require('../Middlewares/verifyToken')

ticketApp.post('/:moviename/add',verifyToken,expressAsyncHandler(bookTicket));
ticketApp.put('/:moviename/update/:ticket',verifyToken,expressAsyncHandler(updateTicketStatus));
ticketApp.delete('/:moviename/delete/:id',verifyToken,expressAsyncHandler(deleteMovie));



module.exports=ticketApp