const fs = require('fs');
const path = require('path');

async function saveImage(file, existingFilePath = null) {
  try {
    const uploadPath = path.join(__dirname, '../uploads');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    if (existingFilePath) {
      await deleteImage(existingFilePath);
    }

    const filename = Date.now() + path.extname(file.originalname);
    const filePath = path.join(uploadPath, filename);

    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    throw new Error('Error saving image');
  }
}

async function deleteImage(imagePath) {
  const existingFullPath = path.join(__dirname, '../uploads', imagePath.split('/uploads/')[1]);
  if (fs.existsSync(existingFullPath)) {
    fs.unlinkSync(existingFullPath);
  }
}

module.exports = { saveImage, deleteImage };
