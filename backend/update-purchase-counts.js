const mongoose = require('mongoose');
const Book = require('./src/books/book.model');
require('dotenv').config();

async function updatePurchaseCounts() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to MongoDB');
    
    const books = await Book.find();
    console.log(`Found ${books.length} books`);
    
    for (let i = 0; i < books.length; i++) {
      const purchaseCount = Math.floor(Math.random() * 50);
      await Book.findByIdAndUpdate(books[i]._id, { purchaseCount });
      console.log(`Updated book ${i+1}/${books.length}: "${books[i].title}" with purchase count ${purchaseCount}`);
    }
    
    console.log('Successfully updated purchase counts for all books');
  } catch (error) {
    console.error('Error updating purchase counts:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

updatePurchaseCounts(); 