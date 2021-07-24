const Image = require('../models/Image');
const convertToBase64 = require('../helpers/convertToBase64');
const cloudinary = require('../helpers/upload');

module.exports = {
  addImage: async (req, res) => {
    const { label, url } = req.body;
    const file = req.file;
    console.log(file);
    let file_url;
    let public_id;
    if (file) {
      const { content } = convertToBase64(file);
      const result = await cloudinary.upload(content);
      file_url = result.secure_url;
      public_id = result.public_id;
    }

    let newImage = new Image({
      label,
      url: file ? file_url : url,
      public_id: file ? public_id : '',
    });

    try {
      newImage = await newImage.save();
      return res.json(newImage);
    } catch (error) {
      console.log(error);
    }
  },
  getAllImages: async (req, res) => {
    const { limit, skip, searchTerm } = req.query;
    console.log(limit, skip);
    const newLimit = limit ? Number(limit) : 100;
    const newSkip = skip ? Number(skip) : 0;
    const images = await Image.find({
      label: {
        $regex: new RegExp(searchTerm),
        $options: 'i',
      },
    })
      .sort({ createdAt: -1 })
      .skip(newSkip)
      .limit(newLimit);
    const total = await Image.find({
      label: {
        $regex: new RegExp(searchTerm),
        $options: 'i',
      },
    }).countDocuments();
    const pageInfo = {
      total_results: total,
      items_per_page: newLimit,
    };
    return res.json({
      list: images,
      pageInfo,
    });
  },
  deleteImage: async (req, res) => {
    const { id } = req.params;

    try {
      const image = await Image.findById(id);
      await Image.findOneAndDelete(id);

      if (image.public_id && image.public_id !== '') {
        await cloudinary.destroy(image.public_id);
      }

      return res.json({
        message: 'Delete successfully!',
      });
    } catch (error) {
      return res.status(400).json('Server error');
    }
  },
};
