const cron = require('node-cron');
const db = require('../database');
const { notify } = require('./notificationService');

const checkInventory = () => {
  console.log('Running daily inventory check...');
  const items = db.prepare('SELECT * FROM inventory').all();
  const today = new Date();
  
  let alerts = [];

  items.forEach(item => {
    const expiryDate = new Date(item.expiry_date);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (item.quantity < 5) {
      alerts.push(`Low Stock: ${item.name} (${item.quantity} left)`);
    }

    if (diffDays <= 0) {
      alerts.push(`Expired: ${item.name} expired on ${item.expiry_date}`);
    } else if (diffDays <= 3) {
      alerts.push(`Expiring Soon: ${item.name} expires in ${diffDays} days`);
    }
  });

  if (alerts.length > 0) {
    const message = `Inventory Alert System Summary:\n\n${alerts.join('\n')}`;
    notify('Food Inventory Alerts', message);
  }
};

// Run every day at midnight
cron.schedule('0 0 * * *', checkInventory);

// Also run once on startup for testing (optional, but good for demo)
// checkInventory();

module.exports = { checkInventory };
