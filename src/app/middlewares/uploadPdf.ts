import httpStatus from 'http-status';
import multer from 'multer';
import path from 'path';
import ApiError from '../../errors/ApiError';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'dist/pdf/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ['application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    const error = new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      'Only PDF files are allowed'
    );
    console.error(error.message);
    cb(null, false);
  }
};

export const uploadPDF = multer({ storage, fileFilter });
