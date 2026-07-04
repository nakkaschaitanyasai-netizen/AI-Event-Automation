import Event from "../models/Event.js"
import {createCalendarEvent} from "../services/calendarService.js"

export const addCalenderEvent= async (req,res)=>{
    try{
        const{id}=req.params
        const event= await Event.findById(id).lean();
        if (!event){
            return res.status(404).json({ok:false,message:"Event does not exist in DB"})
        }
        console.log("Creating calendar event:", {event,user:req.user.id});
        const response= await createCalendarEvent(event)
        res.status(200).json({ok:true,message:"Event added to calendar successfully"})
    }
    catch(error){
        res.status(500).json({ok:false,message:error.message})
    }
}