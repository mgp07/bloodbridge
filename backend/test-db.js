
const { testConnection, pool } = require("./config/db");

async function runTest() {
    try {
        await testConnection();
    } catch (error) {
        console.error("Database test failed.");
    } finally {
        await pool.end();
    }
}

runTest();
