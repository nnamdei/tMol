/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
const Transaction = require("../models/transaction.model");

exports.uploadImage = async (req, res, next) => {
  try {
    const { url } = req.file;
    const imageUrl = new Transaction({
      imageLink: url,
    });
    const savedImage = await imageUrl.save();
    return res.status(201).json({
      message: "Image saved",
      savedImage,
    });
  } catch (error) {
    next(error);
  }
};
