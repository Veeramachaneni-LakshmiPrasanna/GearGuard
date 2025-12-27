const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  equipmentName: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  purchaseDate: { type: Date, required: true },
  warrantyInfo: { type: String },
  location: { type: String, required: true },
  department: { type: String, required: true },
  employee: { type: String }, // assigned to
  maintenanceTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'MaintenanceTeam', required: true },
  technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

equipmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Equipment', equipmentSchema);
