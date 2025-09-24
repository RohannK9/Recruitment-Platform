import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicantName: {
      type: String,
      required: [true, 'Applicant name is required'],
    },
    applicantEmail: {
      type: String,
      required: [true, 'Applicant email is required'],
      match: [/.+@.+\..+/, 'Valid email required'],
    },
    resumeUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'hired', 'rejected'],
      default: 'applied',
    },
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;
