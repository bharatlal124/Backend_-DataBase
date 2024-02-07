
import { MongoClient } from "mongodb";

const url1 = "mongodb://localhost:27017";
// If the above url gives error (error may be caused due to IPv4/IPv6 configuration conflict), then try the url given below
// const url = "mongodb://127.0.0.1:27017/ecomdb";

const connectToMongoDB = ()=>{
     MongoClient.connect(url)
        .then(client=>{
            console.log("Mongodb is connected");
        })
        .catch(err=>{
            console.log(err);
        })
}

export default connectToMongoDB;