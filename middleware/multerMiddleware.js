import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads'); // destination folder
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname;
//     cb(null, fileName);
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const parser = new DataParser();

// The file (coming from req.file) will have a buffer
export const formatImage = (file) => {
  // console.log(file);

  // Get the file extension name (ex: .webp)
  const fileExtensions = path.extname(file.originalname).toString();

  return parser.format(fileExtensions, file.buffer).content;
};

export default upload;
