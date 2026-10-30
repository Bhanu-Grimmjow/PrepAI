
const multer = require("multer");

 function checkFileType(req, file, cb) {
  
  const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and DOCX files are allowed."));
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: checkFileType,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
