/* eslint-disable consistent-return */
const httpStatus = require("http-status");
const GiftCard = require("../models/giftcard.model");

exports.getAll = async (req, res, next) => {
  try {
    const giftCards = await GiftCard.find().populate('cardCategory');
    if (giftCards) {
      return res.status(httpStatus.OK).json({
        giftCards,
      });
    }
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error: error.message,
    });
  }
};

exports.create = async (req, res, next) => {
  try {
    const { card, rate, image } = req.body;
    const giftCard = new GiftCard({
      card,
      //cardCategory,
      // rate,
      image,
    });

    const newGiftCard = await giftCard.save();
    if (newGiftCard) {
      return res.status(httpStatus.CREATED).json({
        message: "Giftcard created",
        newGiftCard,
      });
    }
    throw new Error("Unsuccessful");
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  try {
    await GiftCard.findOneAndRemove(id);
    return res.status(httpStatus.OK).end();
  } catch (error) {
    return res.status(500).json({
      message: "Unsuccesful",
      error: error.message,
    });
  }
};
