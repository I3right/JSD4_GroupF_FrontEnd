const Activity = require("../models/activity.js");

// สร้าง activity
exports.createActivity = async (req, res) => {
  const { type, title, distance, duration } = req.body; // get must have value
  let { location, date, description, feeling, img } = req.body; // get optional value

  if (date === "") {
    const today = new Date();
    const today_date = today.getDate();
    const today_month = today.getMonth() + 1;
    const today_year = today.getFullYear();
    const today_fulldate = `${today_year}-${today_month}-${today_date}`;
    date = today_fulldate;
  } else {
    console.log(date);
  }

  try {
    const returnData = await Activity.create({
      type,
      title,
      distance,
      duration,
      location,
      date,
      description,
      feeling,
      img,
    });

    if (returnData) {
      return res.status(201).json({ message: "บันทึกเรียบร้อย" });
    }
  } catch (error) {
    return res.status(400).json({ message: "cannot add activity" });
  }
};

// ดู activity ทั้งหมด
exports.getAllActivity = async (req, res) => {
  try {
    const returnData = await Activity.find();
    if (returnData) {
      return res.status(200).json(returnData);
    }
    return res.status(500).json({ message: "ไม่มีข้อมูล" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// ดู activity
exports.getActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const returnData = await Activity.findOne({ _id: activityId });
    if (returnData) {
      return res.status(201).json(returnData);
    }
    return res.status(404).json({ message: "Not found activity" });
  } catch (error) {
    return res.status(400).json({ message: "cannot find activity" });
  }
};

// ลบ activity
exports.deleteActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const returnData = await Activity.findOneAndDelete({ _id: activityId });
    if (returnData) {
      return res.status(201).json({ message: "Delete" });
    }
    return res.status(404).json({ message: "Not found activity" });
  } catch (error) {
    return res.status(400).json({ message: "Cannot delete" });
  }
};

// อัพเดท activity
exports.updateActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const { type, title, distance, duration } = req.body; // get must have value
    let { location, date, description, feeling, img } = req.body; // get optional value

    if (date === "") {
      const today = new Date();
      const today_date = today.getDate();
      const today_month = today.getMonth() + 1;
      const today_year = today.getFullYear();
      const today_fulldate = `${today_year}-${today_month}-${today_date}`;
      date = today_fulldate;
    } else {
      console.log(date);
    }

    console.log(
      activityId,
      type,
      title,
      distance,
      duration,
      location,
      date,
      description,
      feeling,
      img
    );

    const returnData = await Activity.findOneAndUpdate(
      { _id: activityId },
      {
        type,
        title,
        distance,
        duration,
        location,
        date,
        description,
        feeling,
        img,
      }
    );
    if (returnData) {
      return res.status(201).json(returnData);
    }
    // return res.status(404).json({ message: "Not found activity" });
  } catch (error) {
    // return res.status(400).json({ message: "Cannot delete" });
  }
};

