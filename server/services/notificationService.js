const nodemailer = require('nodemailer');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Telegram Bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const chatId = process.env.TELEGRAM_CHAT_ID;

const sendEmail = async (subject, text) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email credentials not configured. Skipping email.');
    return;
  }
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to self for now
      subject,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendTelegram = async (message) => {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.log('Telegram credentials not configured. Skipping telegram.');
    return;
  }
  try {
    await bot.sendMessage(chatId, message);
    console.log('Telegram message sent successfully');
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
};

const notify = async (subject, message) => {
  await sendEmail(subject, message);
  await sendTelegram(message);
};

module.exports = { notify };
