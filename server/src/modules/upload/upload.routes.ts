import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateAdmin } from '../../middlewares/auth.middleware';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const IMAGE_LIMIT = 50 * 1024 * 1024;  // 50 MB
const VIDEO_LIMIT = 500 * 1024 * 1024; // 500 MB

const upload = multer({
  storage,
  limits: { fileSize: VIDEO_LIMIT }, // use max limit; per-type check in fileFilter
  fileFilter: (req, file, cb) => {
    const isImage = file.mimetype.startsWith('image/');
    const isVideo = file.mimetype.startsWith('video/');

    if (!isImage && !isVideo) {
      return cb(new Error('Only image and video files are allowed.'));
    }

    // Attach type so route can enforce per-type size limit
    (req as any)._uploadedFileType = isImage ? 'image' : 'video';
    cb(null, true);
  },
});

router.post('/', authenticateAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  // Per-type size enforcement
  const fileType = (req as any)._uploadedFileType;
  if (fileType === 'image' && req.file.size > IMAGE_LIMIT) {
    return res.status(400).json({ success: false, message: 'Image size must not exceed 50 MB.' });
  }

  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  const url = `${baseUrl}/uploads/${req.file.filename}`;
  return res.status(200).json({ success: true, url });
});

export default router;
