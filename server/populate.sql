-- Insert random data
INSERT INTO HotelChains (street_number, street_name, num_hotels) VALUES
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
(1, 'Alice', 'Brown', 789, 'Elm St', 'SIN123456', 'Managers'),
(2, 'Bob', 'Johnson', 234, 'Maple St', 'SIN987654', 'Receptionist');