const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  upload: async (base64) => {
    try {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        base64,
        {
          upload_preset: 'huong_mern',
        }
      );

      return { public_id, secure_url };
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  },
  destroy: async (public_id) => {
    await cloudinary.uploader.destroy(public_id);
  },
};
