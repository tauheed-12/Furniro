import { pool } from "./config/dbConfig.js";

const createDatabaseAndTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE,
        verify_token VARCHAR(255),
        verify_token_expiry BIGINT,
        forgot_password_token VARCHAR(255),
        forgot_password_token_expiry BIGINT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Products (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        imageUrl VARCHAR(500),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Orders (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        userId BIGINT NOT NULL,
        paymentMethod VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES Users(id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS OrderItems (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        orderId BIGINT NOT NULL,
        productId BIGINT,
        productName VARCHAR(255),
        color VARCHAR(50),
        size VARCHAR(50),
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        productImgUrl VARCHAR(500),
        status VARCHAR(50),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (orderId) REFERENCES Orders(id),
        FOREIGN KEY (productId) REFERENCES Products(id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS BillingDetails (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        orderId BIGINT NOT NULL,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        company VARCHAR(100),
        country VARCHAR(100),
        city VARCHAR(100),
        streetAddress VARCHAR(255),
        province VARCHAR(100),
        zipCode VARCHAR(20),
        email VARCHAR(255),
        additionalInfo TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (orderId) REFERENCES Orders(id)
      );
    `);

    process.exit(0);
  } catch (err) {
    console.error("Error creating database/tables:", err);
    process.exit(1);
  }
};

createDatabaseAndTables();
