/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
const Transaction = require("../models/transaction.model");

exports.uploadImage = async (req, res, next) => {
  try {
    // const { url } = req.file;
    let imageUrlList = []
    req.files.map((item) => {
      imageUrlList.push(item.url)
    })
    const { paymentMethod, amount, subCategory, cardName } = req.body
    const imageUrl = new Transaction({
      paymentMethod,
      imageLink: imageUrlList,
      amount,
      subCategory,
      cardName
    });
 
    const { paymentMethod,comment,payableAmount, amount, subCategory, cardName } = req.body;
    // const { url } = req.files;
    // eslint-disable-next-line prefer-const
    let imageUrlList = [];
    req.files.map((item) => imageUrlList.push(item.url));
  
    const imageUrl = new Transaction({
      paymentMethod,
      amount,
      subCategory,
      cardName,
      comment,
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
