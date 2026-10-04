import multer from 'multer';

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

// The file (coming from req.file) will have a buffer
export const formatImage = (file) => {
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
};

export default upload;
