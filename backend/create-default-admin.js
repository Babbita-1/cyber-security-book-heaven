const mongoose = require('mongoose');
const User = require('./src/admin/admin.model');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createDefaultAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore');

        // Check if admin exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('Admin@123', 10);
            const admin = new User({
                username: 'admin',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('Default admin created:');
            console.log('Username: admin');
            console.log('Password: Admin@123');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createDefaultAdmin();
