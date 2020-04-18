/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

exports.uploadUserImage = async (req, res, next) => {
  try {
    const { url } = req.file;

    const updatedImage = await User.findByIdAndUpdate(req.user.id, { profileImageLink: url }, {
      useFindAndModify: false,
    }).save();

    if (updatedImage) {
      return res.status(201).json({
        message: "Image saved",
        response: url,

      });
    }
    return res.status(404).json({
      message: "User not found",
    });
  } catch (error) {
    next(error);
  }
};

exports.uploadTransactionImage = async (req, res, next) => {
  try {
    const { paymentMethod, amount, subCategory, cardName } = req.body;
    // const { url } = req.files;
    // eslint-disable-next-line prefer-const
    let imageUrlList = [];
    req.files.map((item) => imageUrlList.push(item.url));
    console.log(req);

    const imageUrl = new Transaction({
      paymentMethod,
      amount,
      subCategory,
      cardName,
      imageLink: imageUrlList,
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
