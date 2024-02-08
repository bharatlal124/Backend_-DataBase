import { getDB } from "../../config/mongodb.js";

export default class BucketListModel {
  constructor(title, description, dateAdded, targetDate, isCompleted) {
    this.title = title;
    this.description = description;
    this.dateAdded = dateAdded;
    this.targetDate = targetDate;
    this.isCompleted = isCompleted;
  }

  // Move the below methods to the repository file
  
  
}
