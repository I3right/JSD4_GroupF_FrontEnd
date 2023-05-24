const Activity = require("../models/activity.js");

// สร้าง activity
exports.createActivity = async (req, res) => {
  const { type, title, distance, duration, userId } = req.body; // get must have value
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
      userId,
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

// ดู activity ของ userId
exports.getAllActivity = async (req, res) => {
  const { userId } = req.params;
  // console.log(userId);
  try {
    const returnData = await Activity.find({userId:userId});
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
    console.log(req);
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

// agregate activity 10 at a time
exports.queryActivity = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  console.log(page, limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  console.log(startIndex, endIndex);

  try {
    const returnData = await Activity.find()
      .skip(startIndex)
      .limit(limit)
      .exec();
    console.log(returnData);
    if (returnData) {
      return res.status(200).json(returnData);
    }
    return res.status(404).json({ message: "ไม่มีข้อมูล" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getSumHikingDistances = async (req, res) => {
  try {
    const { userId } = req.params;
    const activities = await Activity.find({ type: "hiking", userId: userId });
    const sum = activities.reduce((total, activity) => total + activity.distance, 0);
    return res.status(200).json({ sum });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSumRunningDistances = async (req, res) => {
  try {
    const { userId } = req.params;
    const activities = await Activity.find({ type: "running", userId: userId });
    const sum = activities.reduce((total, activity) => total + activity.distance, 0);
    return res.status(200).json({ sum });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};



// agregate activity 10 at a time
// exports.queryActivity = async (req, res) => {
//   const page = req.query.page;
//   const limit = req.query.limit;
//   console.log(page, limit);

//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   console.log(startIndex, endIndex);

//   try {
//     const returnData = await Activity.find()
//       .skip(startIndex)
//       .limit(limit)
//       .exec();
//     console.log(returnData);
//     if (returnData) {
//       return res.status(200).json(returnData);
//     }
//     return res.status(404).json({ message: "ไม่มีข้อมูล" });
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };

