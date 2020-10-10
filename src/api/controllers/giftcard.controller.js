/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
const httpStatus = require("http-status");
const CardCategory = require("../models/cardcategory.model");
const GiftCard = require("../models/giftcard.model");

exports.getAll = async (req, res, next) => {
  try {
    const giftCards = await GiftCard.find().populate("cardCategory");
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
      // cardCategory,
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

exports.available = async (req, res, next) => {
  const { id } = req.params;
  try {
    const available = await GiftCard.findById(id);
    await available.updateOne({ isAvailable: !available.isAvailable }, { useFindAndModify: false, new: true, });
    await available.save();

    if (available) {
      return res.status(httpStatus.CREATED).json({
        message: "Details updated",
        available,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Unsuccessful",
      error: error.message,
    });
  }
};


exports.whatsapp = async (req, res, next) => {
  const { id } = req.params;
  try {
    const whatsapp = await GiftCard.findById(id);
    await whatsapp.updateOne({ isWhatsapp: !whatsapp.isWhatsapp }, { useFindAndModify: false, new: true, });
    await whatsapp.save();

    if (whatsapp) {
      return res.status(httpStatus.CREATED).json({
        message: "Details updated",
        whatsapp,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Unsuccessful",
      error: error.message,
    });
  }
};


exports.delete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const giftCard = await GiftCard.findById(id);
    const subcategory = giftCard.cardCategory;

    for (let index = 0; index < subcategory.length; index++) {
      await CardCategory.findByIdAndRemove({ _id: subcategory[index] });
    }

    await giftCard.remove();

    return res.status(httpStatus.OK).json({ message: "Successful" });
  } catch (error) {
    return res.status(500).json({
      message: "Unsuccessful",
      error: error.message,
      subcategory,
    });
  }
};
