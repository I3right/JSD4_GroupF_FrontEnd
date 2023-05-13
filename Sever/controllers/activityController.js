const Activity = require("../models/activity.js");

const validateValueMustHave = ({ type, title, distance, duration }) => {
  const errorMessage = "";
  if (type === "") {
    errorMessage = "กรุณาเลือกประเภทกีฬา";
  }
  if (title === "") {
    errorMessage = "กรุณาป้อนชื่อกิจกรรม";
  }
  if (distance === 0) {
    errorMessage = "กรุณาป้อนระยะทาง(km)";
  }
  if (duration === 0) {
    errorMessage = "กรุณาป้อนระยะเวลา(min)";
  }
  return errorMessage;
};

// สร้าง activity
exports.createActivity = async (req, res) => {
  try {
    console.log(req.body);
    const { type, title, distance, duration } = req.body; // get must have value
    const { date, description, feeling, img } = req.body; // get optional value

    const returnData = await Activity.create({
      type,
      title,
      distance,
      duration,
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
    return res.status(400).json({ message: "cannot finduser" });
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
    const { title, distance, duration } = req.body;
    const returnData = await Activity.findOneAndUpdate(
      { _id: activityId },
      { title, distance, duration }
    );
    if (returnData) {
      return res.status(201).json({ message: "Update alredy" });
    }
    return res.status(404).json({ message: "Not found activity" });
  } catch (error) {
    return res.status(400).json({ message: "Cannot delete" });
  }
};
