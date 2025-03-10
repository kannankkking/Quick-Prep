const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: 'Adminlogin' }); 
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
