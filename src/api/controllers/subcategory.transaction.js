const httpStatus = require("http-status");
const CardCategory = require("../models/cardcategory.model");
const GiftCard = require("../models/giftcard.model");
const mongoose = require("mongoose");

exports.create = async (req, res, next) => {
  const { cardId, title, rate } = req.body;
  const _id = mongoose.Types.ObjectId(cardId);
  try {
    const foundGiftcard = await GiftCard.findById(_id);
    if (foundGiftcard) {
      const subgiftcard = new CardCategory({
        title,
        rate,
      });

      if (subgiftcard) {
        await subgiftcard.save();

        await foundGiftcard.cardCategory.push(subgiftcard._id);
        await foundGiftcard.save();
        return res.status(httpStatus.CREATED).json({
          message: "Subcategory added",
          newSubCard: subgiftcard,
        });
      } else {
        throw new Error("Unsuccessful");
      }
    }

    throw new Error("Unsuccessful");
  } catch (error) {
    return next(error, "Error");
  }
};

exports.update = async (req, res, next) => {
  const { subcategoryId, rate } = req.body;
  const _id = mongoose.Types.ObjectId(subcategoryId);

  try {
    let foundSubcategory = await CardCategory.findByIdAndUpdate(
      _id,
      { rate },
      { new: true }
    );
    if (foundSubcategory) {
      return res.status(httpStatus.CREATED).json({
        message: "Subcategory updated",
        updatedSubcategory: foundSubcategory,
      });
    }
    throw new Error("Unsuccessful");
  } catch (error) {
    return next(error, "Error");
  }
};

exports.available = async (req, res, next) => {
  const { id } = req.params;
  try {
    const available = await CardCategory.findByIdAndUpdate(
      id,
      { isAvailable: false },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    if (available) {
      return res.status(httpStatus.CREATED).json({
        message: "Details updated",
        available,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Unsuccesful",
      error: error.message,
    });
  }
};
