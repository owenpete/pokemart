import mongoose from 'mongoose';

const connection = <{isConnected: number, db: any}>{};

async function connectStore(){
  console.log("\nStore:");
  console.log('pre: '+connection.isConnected)
  if(connection.isConnected){
    console.log('connected: '+connection.isConnected)
    return connection.db;
  }
    const db = mongoose.createConnection(process.env.MURI_STORE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    connection.isConnected = db.readyState;
    connection.db = db;
    console.log('not connected: '+connection.isConnected)
    return db;
}


export default connectStore;
