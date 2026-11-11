
const { pool } = require("./config/db");

async function checkDatabase() {
    try {
        const [tables] = await pool.query("SHOW TABLES");

        for (const table of tables) {
            const tableName = Object.values(table)[0];

            console.log("\n----------------------------");
            console.log("TABLE:", tableName);
            console.log("----------------------------");

            const [columns] = await pool.query(
                `DESCRIBE \`${tableName}\``
            );

            console.table(columns);
        }

    } catch (error) {
        console.error("Database check failed:", error.message);
    } finally {
        await pool.end();
    }
}

checkDatabase();
