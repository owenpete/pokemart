import mongoose from 'mongoose';

async function connectGeneral(){
    const db = await mongoose.createConnection(process.env.MURI_GENERAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return db;
}

export default connectGeneral;
