/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
const Transaction = require("../models/transaction.model");

exports.uploadImage = async (req, res, next) => {
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
