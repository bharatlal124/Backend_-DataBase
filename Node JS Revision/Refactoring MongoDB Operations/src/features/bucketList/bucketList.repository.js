// Please don't change the pre-written code
// Import the necessary modules here

import { getDB } from "../../config/mongodb.js";
import BucketListModel from "./bucketList.model.js";

class BucketListRepository {
  async addBucketListItem(bucketListItem) {
    // Write your code here
    try {
      const db = getDB();

      const collection = db.collection("bucketListItems");
      await collection.insertOne(bucketListItem);

      return bucketListItem;
    } catch (err) {
      console.log("Error in adding bucket list item: ", err);
    }
  }

  async findOneBucketListItem(title) {
    // Write your code here
    try {
      const db = getDB();

      const item = await db.collection("bucketListItems").findOne({ title });
      // await collection.findOne({ title });

      return item;
    } catch (err) {
      console.log("Something went wrong", err);
    }
  }
}

export default BucketListRepository;
