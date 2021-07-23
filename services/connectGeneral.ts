import mongoose from 'mongoose';

const connection = <{isConnected: number, db: any}>{};

//established a connection with the "general" database
async function connectGeneral(){
  console.log("\nGeneral:")
  console.log("pre: "+connection.isConnected)
  if(connection.isConnected){
    console.log("connected: "+connection.isConnected)
    return connection.db;
  }
    const db = mongoose.createConnection(process.env.MURI_GENERAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    connection.isConnected=db.readyState;
    connection.db = db;
    console.log("not connected: "+connection.isConnected)
    return db;
}

export default connectGeneral;
