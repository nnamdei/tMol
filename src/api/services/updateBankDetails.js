const User = require("../models/user.model");

exports.updateBankDetails = async (req, res, next) => {
  try {
    const { accountName, accountNumber, bankName } = req.body;
    const bankDetails = await User.findByIdAndUpdate(req.user.id, {
      accountName,
      accountNumber,
      bankName,
    });
    if (bankDetails) {
      return res.status(201).json({
        message: "Bank details",
        bankDetails,
      });
    }
    throw new Error("Unsuccesful");
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
