const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../database');
const { parseExcel } = require('../services/excelService');
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

// Upload Excel
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const filePath = req.file.path;
    const items = parseExcel(filePath);

    const insert = db.prepare('INSERT INTO inventory (name, quantity, expiry_date, status) VALUES (?, ?, ?, ?)');
    
    const transaction = db.transaction((data) => {
      for (const item of data) {
        // Calculate initial status
        const today = new Date();
        const expiryDate = new Date(item.expiry_date);
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let status = 'Safe';
        if (diffDays <= 3) status = 'Expiring Soon';
        if (item.quantity < 5) status = 'Low Stock';
        if (diffDays <= 0) status = 'Expired';

        insert.run(item.name, item.quantity, item.expiry_date, status);
      }
    });

    transaction(items);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({ message: 'Inventory uploaded successfully', count: items.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process inventory file' });
  }
});

// Get Inventory
router.get('/inventory', (req, res) => {
  const items = db.prepare('SELECT * FROM inventory ORDER BY created_at DESC').all();
  res.json(items);
});

// Get Alerts
router.get('/alerts', (req, res) => {
  const items = db.prepare("SELECT * FROM inventory WHERE status != 'Safe'").all();
  res.json(items);
});

// Clear Inventory (Extra for convenience)
router.post('/clear', (req, res) => {
  db.prepare('DELETE FROM inventory').run();
  res.json({ message: 'Inventory cleared' });
});

module.exports = router;
