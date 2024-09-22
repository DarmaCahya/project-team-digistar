const fs = require('fs');
const path = require('path');

async function saveImage(file, existingFilePath = null) {
  try {
    const uploadPath = path.join(__dirname, '../uploads');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    if (existingFilePath) {
      try {
        await fs.unlink(path.join(uploadPath, existingFilePath));
      } catch (error) {
        console.error('Error deleting old file:', error);
      }
    }

    const filename = Date.now() + path.extname(file.originalname);
    const filePath = path.join(uploadPath, filename);

    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    throw new Error('Error saving image');
  }
}

const deleteImage = (imagePath) => {
  const fullPath = path.join(__dirname, '../uploads', imagePath.split('/uploads/')[1]);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

module.exports = { saveImage, deleteImage };
