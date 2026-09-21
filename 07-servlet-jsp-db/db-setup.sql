-- db-setup.sql — Creates the database and users table used by
-- Module 7 (Servlet + JSP + MySQL). Run this once in MySQL
-- Workbench (or via the mysql CLI) before deploying the servlets.

CREATE DATABASE IF NOT EXISTS college_portal;
USE college_portal;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    password VARCHAR(100) NOT NULL
);