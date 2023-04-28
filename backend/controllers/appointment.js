const Appointment = require('../models/Appointment.js');
const Campground = require('../models/Campground.js');
//@desc Get all appointments
//@router GET /api/v1/appointments
//@access Public
exports.getAppointments = async (req,res,next)=>{
    let query;
    // General users can see only their appointments!
    if (req.user.role !== 'admin') {
        query = Appointment.find({user:req.user.id}).populate({
            path: 'campground',
            select: 'name tel'
        });
    } else {
        query = Appointment.find().populate({
            path: 'campground',
            select: 'name tel'
        });
    }
    try {
        const appointments = await query;

        res.status(200).json({
            success:true,
            count:appointments.length,
            data:appointments
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Cannot find Appointment"});
    }

};

//@desc Get single appointment
//@router GET /api/v1/appointments/:id
//@access Public
exports.getAppointment = async (req,res,next)=>{
    try {

        const appointment = await Appointment.findById(req.params.id).populate({
            path: 'campground',
            select: 'name tel'
        });

        if(!appointment) {
            return res.status(404).json({success:false, message: `No appointment with the id of ${req.params.id}`});
        }

        if (appointment.user.toString()!== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success:false,
                message: `User ${req.user.id} is not authorized to view this appointment`
            });
        }

        return res.status(200).json({
            success:true,
            data: appointment
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({success:false, message: "Cannot find Appointment"});
    }

};

//@desc Add appointment
//@router POST /api/v1/campgrounds/:campgroundId/appointments
//@access Private
exports.addAppointment = async (req,res,next)=>{
    try {
        req.body.campground = req.params.campgroundId;

        const campground = await Campground.findById(req.params.campgroundId);

        if(!campground) {
            return res.status(404).json({success:false, message: `No campground with the id of ${req.params.campgroundId}`});
        }
        // add user Id to req.body
        req.body.user = req.user.id;

        // Check for existed appointment
        const existedAppointments = await Appointment.find({user:req.user.id});

        // If the user is not an admin, they can only create 3 appointment.
        if (existedAppointments.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({
                success:false,
                message: `The user with ID ${req.user.id} has already made 3 appointments`
            });
        }

        const appointment = await Appointment.create(req.body);

        return res.status(200).json({
            success:true,
            data: appointment
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({success:false, message: "Cannot create Appointment"});
    }

};

//@desc Update appointment
//@router PUT /api/v1/appointments/:id
//@access Private
exports.updateAppointment = async (req,res,next)=>{
    try {
        let appointment = await Appointment.findById(req.params.id);

        if(!appointment) {
            return res.status(404).json({success:false, message: `No appointment with the id of ${req.params.id}`});
        }

        // Make sure user is the appointment owner
        if (appointment.user.toString()!== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success:false,
                message: `User ${req.user.id} is not authorized to update this appointment`
            });
        }

        appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        return res.status(200).json({
            success:true,
            data: appointment
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({success:false, message: "Cannot update Appointment"});
    }

};

//@desc Delete appointment
//@router DELETE /api/v1/appointments/:id
//@access Private
exports.deleteAppointment = async (req,res,next)=>{
    try {
        const appointment = await Appointment.findById(req.params.id);

        if(!appointment) {
            return res.status(404).json({success:false, message: `No appointment with the id of ${req.params.id}`});
        }

        // Make sure user is the appointment owner
        if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success:false,
                message: `User ${req.user.id} is not authorized to delete this appointment`
            });
        }
        await appointment.deleteOne();

        return res.status(200).json({
            success:true,
            data: {}
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({success:false, message: "Cannot delete Appointment"});
    }

};