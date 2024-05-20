const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('Environment Variables:');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_LOCAL_PORT: ${process.env.NODE_LOCAL_PORT}`);
console.log(`MONGODB_USER: ${process.env.MONGODB_USER}`);
console.log(`MONGODB_PASSWORD: ${process.env.MONGODB_PASSWORD}`);
console.log(`MONGODB_DATABASE: ${process.env.MONGODB_DATABASE}`);
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_PORT: ${process.env.DB_PORT}`);
console.log(`TEST_DB_HOST: ${process.env.TEST_DB_HOST}`);

