const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  requestType: { type: String, enum: ['Corrective', 'Preventive'], required: true },
  maintenanceTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'MaintenanceTeam', required: true },
  technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scheduledDate: { type: Date },
  duration: { type: Number }, // in hours
  status: { 
    type: String, 
    enum: ['New', 'In Progress', 'Repaired', 'Scrap'], 
    default: 'New' 
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

requestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('MaintenanceRequest', requestSchema);
