const { Schema, model } = require('mongoose');

const imageSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = model('Image', imageSchema);
module.exports = Image;
