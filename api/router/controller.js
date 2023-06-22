const controller = require('express').Router()
const Ticket = require('../models/ticket')

controller.get('/status/:seatNo', async (req, res) => {
  try {
    const ticket = await Ticket.find({seatNo:req.params.seatNo},{ticketStatus:1,_id:0,seatNo:1});
    return res.status(200).json(ticket)
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

controller.get('/statuses/open', async (req, res) => {
  try {
    
    const ticket = await Ticket.find({ticketStatus:'Open'},{ticketStatus:1,_id:0,seatNo:1});
    if(ticket.length===0){
      return res.status(200).json("No open tickets available")
    }
    return res.status(200).json(ticket)
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

controller.get('/statuses/close', async (req, res) => {
  try {
    
    const ticket = await Ticket.find({ticketStatus:'Close'},{ticketStatus:1,_id:0,seatNo:1});
    if(ticket.length===0){
      return res.status(200).json("No closed tickets available")
    }
    return res.status(200).json(ticket)
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

controller.get('/info/:seatNo', async (req, res) => {
  try {
    
    const ticket = await Ticket.find({seatNo:req.params.seatNo},{username:1,_id:0,phone:1,email:1,from:1,to:1});
    if(ticket[0].username===""){
      return res.status(200).json("No user info available")
    }
    return res.status(200).json(ticket)
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

controller.put('/put', async (req, res) => {
  try {
    const ticket = await Ticket.updateOne({seatNo:req.body.seatNo},{$set:req.body});
    if(ticket.modifiedCount===1 || ticket.modifiedCount===0){
      return res.status(200).json("Data updated successfully")
    }
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

controller.put('/reset', async (req, res) => {
  try {
    const ticket = await Ticket.updateMany({$set:{username:"",email:"",phone:"",from:"",to:"",pickUpTime:"",dropTime:"",ticketStatus:"Open"}});
    if(ticket.modifiedCount===1 || ticket.modifiedCount===0){
      return res.status(200).json("Data updated successfully")
    }
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

module.exports = controller;

