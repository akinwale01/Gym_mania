import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expires in 5 min
});

export default mongoose.models.Otp || mongoose.model('Otp', OtpSchema);