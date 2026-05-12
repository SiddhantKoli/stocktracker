const XLSX = require('xlsx');

const parseExcel = (filePath) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Validate and format data
    return data.map(row => ({
      name: row['Item Name'] || row['item_name'] || row['Name'],
      quantity: parseInt(row['Quantity'] || row['quantity'] || 0),
      expiry_date: row['Expiry Date'] || row['expiry_date'] || row['Expiry']
    })).filter(item => item.name && item.expiry_date);
  } catch (error) {
    console.error('Error parsing Excel:', error);
    throw new Error('Failed to parse Excel file');
  }
};

module.exports = { parseExcel };
