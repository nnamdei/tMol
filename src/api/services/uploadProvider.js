/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
const { dataUri } = require("../middlewares/multerUploads");
const { uploader } = require("../../config/cloudinary");

exports.uploadImage = (req, res) => {
  console.log(req.file);
  const image = {};
  return uploader
    .upload(file)
    .then((result) => {
      const image = result.url;
      return res.status(200).json({
        messge: "Your image has been uploded successfully to cloudinary",
        data: {
          image,
        },
      });
    })
    .catch((err) =>
      res.status(400).json({
        messge: "someting went wrong while processing your request",
        data: {
          err,
        },
      })
    );
};
