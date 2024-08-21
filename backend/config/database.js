const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("database connect"))
    .catch((err)=>console.log(err));

}

// export default connectDB

module.exports = connectDB();