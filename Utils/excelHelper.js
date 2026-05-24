const XLSX = require('xlsx');
const fs = require('fs');

/**
 * Reads a sheet from an Excel file and returns rows as array of objects.
 * @param {string} filePath  - Absolute path to .xlsx file
 * @param {string} sheetName - Sheet name to read (e.g. 'LoginData')
 * @returns {Array<Object>}
 */
function readExcelData(filePath, sheetName) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Excel file not found: ${filePath}`);
  }

  const workbook = XLSX.readFile(filePath);

  if (!workbook.SheetNames.includes(sheetName)) {
    throw new Error(
      `Sheet "${sheetName}" not found. Available: ${workbook.SheetNames.join(', ')}`
    );
  }

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  return rows;  // each row is already { columnHeader: value }
}

module.exports = { readExcelData };