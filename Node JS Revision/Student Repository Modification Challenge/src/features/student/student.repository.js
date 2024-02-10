//No need to change code other than the last four methods
import { getClient, getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
const collectionName = "students";

class studentRepository {
  async addStudent(studentData) {
    const db = getDB();
    await db.collection(collectionName).insertOne(studentData);
  }

  async getAllStudents() {
    const db = getDB();
    const students = await db.collection(collectionName).find({}).toArray();
    return students;
  }

  //You need to implement methods below:

  async createIndexes() {
    try {
      const db = getDB();
      await db.collection(collectionName).createIndex({ name: 1 });
      await db.collection(collectionName).createIndex({ age: 1, grade: -1 });
      console.log("Indexes created successfully.");
    } catch (error) {
      console.error("Error creating indexes:", error);
      throw error; // Rethrow the error to be caught by the controller
    }
  }

  async getStudentsWithAverageScore() {
    try {
      const db = getDB();
      const students = await db
        .collection(collectionName)
        .aggregate([
          // Your aggregation pipeline stages
          { $unwind: "$assignments" },
          {
            $group: {
              _id: "$_id",
              name: { $first: "$name" },
              averageScore: { $avg: "$assignments.score" },
            },
          },
          {
            $project: {
              _id: 0,
              name: 1,
              averageScore: 1,
            },
          },
        ])
        .toArray();
      console.log("Students with average scores:", students);
      return students;
    } catch (error) {
      console.error("Error retrieving students with average scores:", error);
      throw error; // Rethrow the error to be caught by the controller
    }
  }

  async getQualifiedStudentsCount() {
    try {
      const db = getDB();
      const collection = db.collection("students");
      const count = await collection.countDocuments({
        age: { $gt: 9 },
        grade: { $lte: "B" },
        "assignments.title": "Math",
        "assignments.score": { $gte: 60 },
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  async updateStudentGrade(studentId, extraCreditPoints) {
    // const db = getDB();
    // const session = client.startSession();
    // session.startTransaction();
    try {
      const db = getClient().db("Student");
      const student = await db
        .collection(collectionName)
        .findOne({ _id: new ObjectId(studentId) });
      const totalScore =
        student.assignments.reduce((acc, cur) => acc + cur.score, 0) +
        extraCreditPoints;
      const averageScore = totalScore / student.assignments.length;
      let grade;
      if (averageScore >= 90) grade = "A";
      else if (averageScore >= 80) grade = "B";
      else if (averageScore >= 70) grade = "C";
      else if (averageScore >= 60) grade = "D";
      else grade = "F";
      await db.collection(collectionName).updateOne(
        { _id: new ObjectId(studentId) },
        { $set: { grade: grade } }
        //   { session }
      );
      //   await session.commitTransaction();
      //   session.endSession();
    } catch (error) {
      //   await session.abortTransaction();
      //   session.endSession();
      throw error;
    }
  }
}

export default studentRepository;
