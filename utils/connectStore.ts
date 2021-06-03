import mongoose from 'mongoose';

async function connectStore(){
    const db = await mongoose.createConnection(process.env.MURI_STORE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return db;
}


export default connectStore;
