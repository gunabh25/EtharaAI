const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  progress: { type: Number, default: 0 },
  dueDate: { type: Date },
  status: { type: String, enum: ['active', 'completed', 'on-hold'], default: 'active' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
