const XLSX = require('xlsx');
const path = require('path');

const data = [
  { 'Item Name': 'Whole Milk', 'Quantity': 2, 'Expiry Date': '2026-05-20' },
  { 'Item Name': 'Whole Wheat Bread', 'Quantity': 1, 'Expiry Date': '2026-05-12' },
  { 'Item Name': 'Greek Yogurt', 'Quantity': 12, 'Expiry Date': '2026-06-05' },
  { 'Item Name': 'Large Eggs', 'Quantity': 4, 'Expiry Date': '2026-05-15' },
  { 'Item Name': 'Butter', 'Quantity': 3, 'Expiry Date': '2026-12-01' },
];

const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Inventory');

const filePath = path.join(__dirname, 'sample_inventory.xlsx');
XLSX.writeFile(wb, filePath);

console.log(`Sample Excel file created at: ${filePath}`);
