import User from "../models/User.js";

export const getUserById = async (id, res) => {
  const user = await User.findById(id);

  res.status(201).json({
    success: true,
    user,
  });
};

export const allUsers = async (res) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

export const updateRole = async (id, role, res) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};
