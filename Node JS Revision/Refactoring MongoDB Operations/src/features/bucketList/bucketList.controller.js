import BucketListModel from "./bucketList.model.js";
import BucketListRepository from "./bucketList.repository.js";

export default class BucketListController {
  constructor() {
    this.bucketListRepository = new BucketListRepository();
  }

  add = async (req, res) => {
    const { title, description, dateAdded, targetDate, isCompleted } = req.body;
    // Refactor to use the repository method
    // const BucketList = new BucketListModel(
    //   title,
    //   description,
    //   dateAdded,
    //   targetDate,
    //   isCompleted
    // );
    const newitem = new BucketListModel(
      title,
      description,
      dateAdded,
      targetDate,
      isCompleted
    );
    const item = await this.bucketListRepository.addBucketListItem(newitem);

    res.status(201).send(item);
  };

  get = async (req, res) => {
    const { title } = req.query;
    // Refactor to use the repository method
    // const item = new BucketListModel(title);
    try {
      const item = await this.bucketListRepository.findOneBucketListItem(
        req.body.title
      );
      // return item;

      if (!item) {
        res.status(404).send("Item not found.");
      } else {
        res.status(200).send(item);
      }
    } catch (error) {
      res.status(500).send("Error retrieving item from the bucket list.");
      console.error("Error retrieving item:", error);
    }
  };
}
