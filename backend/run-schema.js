
const fs = require("fs");
const path = require("path");
const { pool } = require("./config/db");

async function createTables() {
    try {
        const schemaPath = path.join(
            __dirname,
            "database",
            "schema.sql"
        );

        const sql = fs.readFileSync(schemaPath, "utf8");

        const statements = sql
            .split(";")
            .map(statement => statement.trim())
            .filter(statement => statement.length > 0);

        for (const statement of statements) {
            await pool.query(statement);
        }

        console.log("BloodBridge database tables created successfully!");

        const [tables] = await pool.query("SHOW TABLES");

        console.log("Tables in your database:");
        tables.forEach(table => {
            console.log(Object.values(table)[0]);
        });

    } catch (error) {
        console.error("Database setup failed:", error.message);
    } finally {
        await pool.end();
    }
}

createTables();
