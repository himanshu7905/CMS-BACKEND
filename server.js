const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const axios = require("axios");

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use(
  cors({
    origin: "https://cms-frontend-ebon.vercel.app",
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

// Database connection
const connection = new Client({
  user: "postgres.pmeyjayezeibiuhfyhsi",
  password: "HImanshu123@",
  database: "postgres",
  port: 5432,
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  ssl: { rejectUnauthorized: false },
});

connection
  .connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch((error) => console.error("Database connection error:", error));



// User login route
app.post("/login", async (req, res) => {
    const { email } = req.body;  // Only email is required now
    try {
      // Check if the user exists
      const query = "SELECT * FROM users WHERE email = $1";
      const { rows: users } = await connection.query(query, [email]);
  
      if (users.length === 0) {
        return res.status(400).send("Invalid credentials");
      }
  
      const user = users[0];
      console.log("User object:", user);
  
      // Send the response with the user data (excluding the password)
      const { password: _, ...userWithoutPassword } = user;
      res.send({ message: "Login successful", user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send("Internal server error");
    }
  });
  
  

// Fetch all or user-specific contacts
app.get("/contacts", async (req, res) => {
    console.log(req.body)
  const { role, id } = req.query;  // Assuming you are passing role and id in query params
  const query =
    role === "admin"
      ? "SELECT * FROM contacts"
      : "SELECT * FROM contacts";

  try {
    const { rows: data } = await connection.query(
      query,
      role === "admin" ? [] : []
    );
    res.send(data);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).send("Error fetching contacts");
  }
});

// Create a new contact
app.post("/contacts", async (req, res) => {
  const { name, email, phone, address } = req.body;
  const userId = req.body.id;  // Assuming the user ID is passed in the request body

  const query = `
    INSERT INTO contacts (name, email, phone, address)
    VALUES ($1, $2, $3, $4) RETURNING *`;

  try {
    const { rows: data } = await connection.query(query, [
      name,
      email,
      phone,
      address,
    ]);
    res.send(data[0]);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).send("Error creating contact");
  }
});

// Update a contact
app.put("/contacts/:id", async (req, res) => {
    const { id } = req.params;  // Get the contact ID from the URL parameter
    const { name, email, phone, address } = req.body;  // Get the user inputs from the request body
    
    console.log("Request body:", req.body);
    console.log("Contact ID from params:", id);
  
    try {
      // Fetch the contact by ID
      const fetchQuery = "SELECT * FROM contacts WHERE id = $1";
      const { rows: contact } = await connection.query(fetchQuery, [id]);
      
      console.log("Fetched contact:", contact);  // Debugging fetched contact data
  
      // Check if the contact exists
      if (contact.length === 0) {
        return res.status(404).send("Contact not found");
      }
  
      // Update the contact with the new details
      const updateQuery = `
        UPDATE contacts 
        SET name = $1, email = $2, phone = $3, address = $4
        WHERE id = $5 
        RETURNING *`;
  
      const { rows: updatedContact } = await connection.query(updateQuery, [
        name,
        email,
        phone,
        address,
        id,
      ]);
  
      // Log the updated contact for debugging
      console.log("Updated contact:", updatedContact);
  
      // If the update was successful, send back the updated contact
      if (updatedContact.length > 0) {
        res.send(updatedContact[0]);
      } else {
        res.status(400).send("Failed to update contact");
      }
  
    } catch (error) {
      console.error("Error updating contact:", error);
      res.status(500).send("Error updating contact");
    }
  });
  
  
  

// Delete a contact
app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.body.id;

  try {
    const fetchQuery = "SELECT * FROM contacts WHERE id = $1";
    const { rows: contact } = await connection.query(fetchQuery, [id]);

    if (!contact || contact[0].user_id !== userId) {
      return res.status(403).send("Access denied");
    }

    const deleteQuery = "DELETE FROM contacts WHERE id = $1 RETURNING *";
    const { rows: deletedContact } = await connection.query(deleteQuery, [id]);

    res.send(deletedContact[0]);
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).send("Error deleting contact");
  }
});

// Start the server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
