/* eslint-disable consistent-return */
const httpStatus = require("http-status");
const GiftCard = require("../models/giftcard.model");

exports.getAll = async (req, res, next) => {

  try {
    const giftCards = await GiftCard.find();
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
    const { card, cardCategory, rate, image } = req.body;
    const giftCard = new GiftCard({
      card,
      cardCategory,
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

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { card, cardCategory, rate, image } = req.body;
    const update = { card, cardCategory, rate, image };

    const giftcard = await GiftCard.findByIdAndDelete(id, update);
    console.log(giftcard);
    console.log(update);

    const updatedGiftCard = giftcard.save();
    if (updatedGiftCard) {
      return res.status(httpStatus.ACCEPTED).json({
        message: "Giftcard",
        updatedGiftCard,
      });
    }
    return res.status(404).json({
      message: "Unsuccesful",
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await GiftCard.findByIdAndRemove(id);
    if (deletedProduct) {
      return res.status(httpStatus.ACCEPTED).json({
        message: "Gift card details deleted",
      });
    }
    throw new Error();
  } catch (error) {
    return res.status(500).json({
      message: "Unsuccesful",
      error: error.message,
    });
  }
};
