const httpStatus = require("http-status");
const Bitcoin = require("../models/bitcoin.model");

exports.get = async (req, res, next) => {
  try {
    const bitcoinDetails = await Bitcoin.find();
    if (bitcoinDetails) {
      return res.status(httpStatus.OK).json({
        bitcoinDetails,
      });
    }
    throw new Error();
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error: error.message,
    });
  }
};

exports.create = async (req, res, next) => {
  try {
    const { address, little, meduim, large } = req.body;

    await Bitcoin.collection.drop()
    const bitcoinDetails = new Bitcoin({
      address,
      rates: { little, meduim, large },
    });

    const newBitcoinDetails = await bitcoinDetails.save();
    if (newBitcoinDetails) {
      return res.status(httpStatus.CREATED).json({
        message: "Bitcoin details set",
        newBitcoinDetails,
      });
    }
    throw new Error("Unsuccessful");
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Bitcoin.findOneAndRemove(id);
    return res.status(httpStatus.OK).end();
  } catch (error) {
    return res.status(500).json({
      message: "Unsuccesful",
      error: error.message,
    });
  }
};
