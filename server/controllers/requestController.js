const MaintenanceRequest = require('../models/MaintenanceRequest');
const Equipment = require('../models/Equipment');

// Create a new request
exports.createRequest = async (req, res) => {
  try {
    const { subject, equipment, requestType, scheduledDate } = req.body;

    const equipmentDoc = await Equipment.findById(equipment);
    if (!equipmentDoc) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    const newRequest = new MaintenanceRequest({
      subject,
      equipment,
      requestType,
      maintenanceTeam: equipmentDoc.maintenanceTeam,
      scheduledDate: requestType === 'Preventive' ? scheduledDate : undefined,
      createdBy: req.user._id,
      ...req.body
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update request status (New → In Progress → Repaired → Scrap)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, duration } = req.body;

    const request = await MaintenanceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = status;
    if (duration) request.duration = duration;
    if (status === 'Scrap') {
      // Optionally mark equipment as scrapped
      const equipment = await Equipment.findById(request.equipment);
      equipment.isActive = false;
      await equipment.save();
    }

    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all requests for kanban
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate('equipment', 'equipmentName serialNumber')
      .populate('maintenanceTeam', 'teamName')
      .populate('assignedTo', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get preventive requests for calendar
exports.getPreventiveForCalendar = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find({
      requestType: 'Preventive',
      scheduledDate: { $exists: true }
    })
      .populate('equipment', 'equipmentName')
      .populate('maintenanceTeam', 'teamName');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
