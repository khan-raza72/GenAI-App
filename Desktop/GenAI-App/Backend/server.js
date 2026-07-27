
require('dotenv').config(); // Load environment variables first
const app = require('./src/app');
const connectToDB = require('./src/config/database');



const PORT = process.env.PORT || 3000;

// Pehle Local MongoDB start hoga, uske baad server port listen karega
connectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Custom Architecture Server is running on http://localhost:${PORT}`);
    });
});

