import mongoose from 'mongoose';

const SlideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
});

export default SlideSchema;
