import Mongoose from 'mongoose';

interface SampleInterface extends Mongoose.Document {
  title: string;
  description: string;
}

const SampleModel = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Mongoose.model<SampleInterface>('Sample', SampleModel);
