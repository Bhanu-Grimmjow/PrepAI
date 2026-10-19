const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

async function extractPdfText(buffer) {
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    return result.text;
  } finally {
    await parser.destroy();
  }
}

async function extractDocxText(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

module.exports = {
  extractPdfText,
  extractDocxText,
};
