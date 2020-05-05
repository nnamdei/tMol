const httpStatus = require("http-status");
const CardCategory = require("../models/cardcategory.model");
const GiftCard = require("../models/giftcard.model");
const mongoose = require("mongoose");

exports.create = async (req, res, next) => {
  const { userId, title, rate } = req.body;
  const _id = mongoose.Types.ObjectId(userId);
  try {
    const subgiftcard = new CardCategory({
      title,
      rate,
    });

    const newSubgiftcard = await subgiftcard.save();
    if (newSubgiftcard) {
      res.status(httpStatus.CREATED).json({
        message: "Subcategory added",
        newSubgiftcard,
      });
      return GiftCard.findById(_id)
        .populate("cardCategory")
        .exec((err, card) => {
          if (err) console.log(err);
          else console.log(card);
        });
    }
  } catch (error) {
    return next(error, "Error");
  }
};

// 5eaba6689a094a18c418cca0
