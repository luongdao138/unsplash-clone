const Image = require('../models/Image');

module.exports = {
  addImage: async (req, res) => {
    const { label, url } = req.body;

    let newImage = new Image({
      label,
      url,
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
      await Image.findByIdAndDelete(id);
      return res.json({
        message: 'Delete successfully!',
      });
    } catch (error) {
      return res.status(400).json('Server error');
    }
  },
};
