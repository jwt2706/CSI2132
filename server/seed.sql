DROP DATABASE IF EXISTS ehoteldb;
CREATE DATABASE ehoteldb;

-- Use the database
\c ehoteldb;

-- Create HotelChain table
CREATE TABLE HotelChain (
    id SERIAL PRIMARY KEY,
    street_number INT,
    street_name VARCHAR(255),
    num_hotels INT
);

-- Create HotelChainPhoneNumbers table
CREATE TABLE HotelChainPhoneNumbers (
    hotel_chain_id INT PRIMARY KEY REFERENCES HotelChain(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) UNIQUE
);

-- Create HotelChainEmails table
CREATE TABLE HotelChainEmails (
    hotel_chain_id INT PRIMARY KEY REFERENCES HotelChain(id) ON DELETE CASCADE,
    email VARCHAR(100) UNIQUE
);

-- Create Hotels table
CREATE TABLE Hotels (
    id SERIAL PRIMARY KEY,
    hotel_chain_id INT REFERENCES HotelChain(id) ON DELETE CASCADE,
    street_number INT,
    street_name VARCHAR(255),
    num_rooms INT,
    email VARCHAR(255),
    stars FLOAT CHECK (stars BETWEEN 1 AND 5)
);

-- Create HotelPhoneNumbers table
CREATE TABLE HotelPhoneNumbers (
    hotel_id INT PRIMARY KEY REFERENCES Hotels(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) UNIQUE
);

-- Create Rooms table
CREATE TABLE Rooms (
    hotel_id INT REFERENCES Hotels(id) ON DELETE CASCADE,
    room_num INT,
    price DECIMAL(10,2),
    capacity VARCHAR(10) CHECK (capacity IN ('Single', 'Double')),
    view VARCHAR(10) CHECK (view IN ('Sea', 'Mountain')),
    extendable BOOLEAN,
    issues VARCHAR(255),
    status VARCHAR(10) CHECK (status IN ('Booked', 'Occupied', 'Free')),
    PRIMARY KEY (hotel_id, room_num)
);

-- Create RoomAmenities table
CREATE TABLE RoomAmenities (
    hotel_id INT,
    room_num INT,
    has_tv BOOLEAN,
    has_ac BOOLEAN,
    has_fridge BOOLEAN,
    has_safe BOOLEAN,
    PRIMARY KEY (hotel_id, room_num),
    FOREIGN KEY (hotel_id, room_num) REFERENCES Rooms(hotel_id, room_num) ON DELETE CASCADE
);

-- Create RoomAvailableDates table
CREATE TABLE RoomAvailableDates (
    hotel_id INT,
    room_num INT,
    room_available_date DATE,
    PRIMARY KEY (hotel_id, room_num, room_available_date),
    FOREIGN KEY (hotel_id, room_num) REFERENCES Rooms(hotel_id, room_num) ON DELETE CASCADE
);

-- Create Customers table
CREATE TABLE Customers (
    id SERIAL PRIMARY KEY,
    government_id_type VARCHAR(20) CHECK (government_id_type IN ('ssn', 'sin', 'driver’s license', 'HC')),
    government_id VARCHAR(50) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    street_number INT,
    street_name VARCHAR(100),
    registration_date DATE
);

-- Create Employees table
CREATE TABLE Employees (
    id SERIAL PRIMARY KEY,
    hotel_id INT REFERENCES Hotels(id) ON DELETE CASCADE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    street_number INT,
    street_name VARCHAR(100),
    sin VARCHAR(20) UNIQUE,
    role VARCHAR(50)
);

-- Create Manager table
CREATE TABLE Manager (
    employee_id INT PRIMARY KEY REFERENCES Employees(id) ON DELETE CASCADE,
    hotel_id INT UNIQUE REFERENCES Hotels(id) ON DELETE CASCADE
);

-- Create Bookings table
CREATE TABLE Bookings (
    id SERIAL PRIMARY KEY,
    customer_id INT UNIQUE REFERENCES Customers(id) ON DELETE CASCADE,
    hotel_id INT,
    room_num INT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) CHECK (status IN ('Confirmed', 'Canceled', 'Checked-In')),
    FOREIGN KEY (hotel_id, room_num) REFERENCES Rooms(hotel_id, room_num) ON DELETE CASCADE
);

-- Create Rentings table
CREATE TABLE Rentings (
    id SERIAL PRIMARY KEY,
    customer_id INT UNIQUE REFERENCES Customers(id) ON DELETE CASCADE,
    hotel_id INT,
    room_num INT,
    start_date DATE,
    end_date DATE,
    employee_id INT REFERENCES Employees(id) ON DELETE SET NULL,
    FOREIGN KEY (hotel_id, room_num) REFERENCES Rooms(hotel_id, room_num) ON DELETE CASCADE
);

-- Create RentingArchives table
CREATE TABLE RentingArchives (
    id SERIAL PRIMARY KEY,
    hotel_id INT,
    room_num INT,
    start_date DATE,
    end_date DATE,
    checked_in_by INT,
    customer_id INT,
    renting_id INT
);

-- Create BookingArchives table
CREATE TABLE BookingArchives (
    id SERIAL PRIMARY KEY,
    hotel_id INT,
    room_num INT,
    start_date DATE,
    end_date DATE,
    customer_id INT,
    booking_id INT
);

-- Insert random data
INSERT INTO HotelChain (street_number, street_name, num_hotels) VALUES
(101, 'Main St', 5),
(202, 'Second Ave', 3),
(303, 'Third Blvd', 7);

INSERT INTO Hotels (hotel_chain_id, street_number, street_name, num_rooms, email, stars) VALUES
(1, 500, 'Ocean Drive', 100, 'hotel1@example.com', 4.5),
(1, 600, 'Mountain Road', 80, 'hotel2@example.com', 4.0),
(2, 700, 'City Center', 120, 'hotel3@example.com', 5.0);

INSERT INTO Rooms (hotel_id, room_num, price, capacity, view, extendable, issues, status) VALUES
(1, 101, 150.00, 'Single', 'Sea', TRUE, NULL, 'Free'),
(1, 102, 200.00, 'Double', 'Mountain', FALSE, 'Air conditioning issue', 'Booked'),
(2, 201, 175.00, 'Double', 'Sea', TRUE, NULL, 'Occupied');

INSERT INTO Customers (government_id_type, government_id, first_name, last_name, street_number, street_name, registration_date) VALUES
('ssn', '123-45-6789', 'John', 'Doe', 123, 'Broadway', '2023-01-01'),
('driver’s license', 'D12345678', 'Jane', 'Smith', 456, 'Park Ave', '2023-02-01');

INSERT INTO Employees (hotel_id, first_name, last_name, street_number, street_name, sin, role) VALUES
(1, 'Alice', 'Brown', 789, 'Elm St', 'SIN123456', 'Manager'),
(2, 'Bob', 'Johnson', 234, 'Maple St', 'SIN987654', 'Receptionist');
