// import ErrorHandler from "../middleware/error.js";
import Task from "../models/task.js";

const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user
    });

    res.status(201).json({
      success: true,
      message: "Task added succefully"
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error
    })
  }
}

const getTask = async (req, res, next) => {
  try {
    const userid = req.user._id
    const task = await Task.find({ user: userid });
    res.status(201).json({
      success: true,
      task
    })

  } catch (error) {
    res.status(404).json({
      success: false,
      message : "No Task Found"
    })
  }
}

const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    if (!task) 
    throw new Error("Task not found")
    // return next(new ErrorHandler("Task not found", 404));
    res.status(201).json({
      success: true,
      message: "Updated task successfully",
    })

  } catch (error) {
    // next(error)
    res.status(404).json({
      success: false,
      message : "No Task Found to update"
    })
  }

}

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) 
    throw new Error("Task not found")
    // return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();

    res.status(200).json({
      message: "Task Deleted!",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message : "Task not Exist or created."
    })
  }
};

export { newTask, getTask, updateTask, deleteTask }