INSERT INTO HotelChains (name, street_number, street_name, num_hotels) VALUES
    ('Global Luxury Hotels', 101, 'Main Street', 10),
    ('Eco Resorts Group', 202, 'Green Avenue', 9),
    ('Budget Hostel Network', 303, 'Backpacker Lane', 8),
    ('Urban Stays', 404, 'Downtown Blvd', 8),
    ('Sunset Resorts', 505, 'Coastal Road', 9);

INSERT INTO Hotels (hotel_chain_id, street_number, street_name, num_rooms, email, stars, category, name) VALUES
    -- Global Luxury Hotels
    (1, 11, 'Main Street', 50, 'lux1@example.com', 5, 'Luxury', 'Grand Elite Hotel'),
    (1, 12, 'Main Street', 60, 'lux2@example.com', 4.5, 'Luxury', 'Royal Prestige Hotel'),
    (1, 13, 'Luxury Lane', 55, 'lux3@example.com', 4.8, 'Luxury', 'The Opulent Retreat'),
    (1, 14, 'Downtown Blvd', 70, 'lux4@example.com', 5, 'Luxury', 'Downtown Grand'),
    (1, 15, 'Ocean Drive', 45, 'lux5@example.com', 4.2, 'Resort', 'Ocean Breeze Resort'),
    (1, 16, 'Resort Road', 90, 'lux6@example.com', 4.9, 'Resort', 'Azure Bay Resort'),
    (1, 17, 'Hostel Avenue', 30, 'lux7@example.com', 3.9, 'Hostel', 'Luxury Backpackers Inn'),
    (1, 18, 'Budget Street', 40, 'lux8@example.com', 3.8, 'Hostel', 'Metropolitan Hostel'),
    
    -- Eco Resorts Group
    (2, 21, 'Eco Avenue', 80, 'eco1@example.com', 4.7, 'Resort', 'Eco Haven Resort'),
    (2, 22, 'Eco Avenue', 75, 'eco2@example.com', 4.5, 'Resort', 'Green Oasis Resort'),
    (2, 23, 'Green Street', 65, 'eco3@example.com', 4.6, 'Resort', 'Nature Escape Resort'),
    (2, 24, 'Green Street', 50, 'eco4@example.com', 4.2, 'Luxury', 'Emerald Suites'),
    (2, 25, 'Eco Lane', 55, 'eco5@example.com', 4.0, 'Luxury', 'Serenity Grand Hotel'),
    (2, 26, 'Eco Retreat Rd', 40, 'eco6@example.com', 3.7, 'Hostel', 'Eco Travelers Lodge'),
    (2, 27, 'Backpacker Ave', 35, 'eco7@example.com', 3.5, 'Hostel', 'Wanderlust Hostel'),
    (2, 28, 'Budget Road', 60, 'eco8@example.com', 3.9, 'Hostel', 'Budget Explorer Inn'),
    
    -- Budget Hostel Network
    (3, 31, 'Backpacker Lane', 20, 'hostel1@example.com', 3.2, 'Hostel', 'Nomad’s Haven'),
    (3, 32, 'Backpacker Lane', 25, 'hostel2@example.com', 3.0, 'Hostel', 'Urban Backpackers'),
    (3, 33, 'Cheap Stay St', 30, 'hostel3@example.com', 3.4, 'Hostel', 'Affordable Lodge'),
    (3, 34, 'Affordable Blvd', 22, 'hostel4@example.com', 3.5, 'Hostel', 'City Budget Hostel'),
    (3, 35, 'Budget Avenue', 28, 'hostel5@example.com', 3.3, 'Hostel', 'Downtown Travelers Inn'),
    (3, 36, 'Main Street', 50, 'hostel6@example.com', 4.1, 'Luxury', 'Metropolitan Grandeur'),
    (3, 37, 'Ocean Drive', 60, 'hostel7@example.com', 4.0, 'Resort', 'Blue Horizon Resort'),
    (3, 38, 'Downtown Blvd', 45, 'hostel8@example.com', 4.2, 'Resort', 'City Escape Resort'),
    
    -- Urban Stays
    (4, 41, 'Downtown Blvd', 100, 'urban1@example.com', 4.5, 'Luxury', 'Skyline Heights'),
    (4, 42, 'City Center', 90, 'urban2@example.com', 4.6, 'Luxury', 'Grand Central Hotel'),
    (4, 43, 'Skyline Road', 85, 'urban3@example.com', 4.7, 'Luxury', 'The Executive Suites'),
    (4, 44, 'Urban Way', 75, 'urban4@example.com', 4.3, 'Luxury', 'Cityscape Hotel'),
    (4, 45, 'Budget Road', 50, 'urban5@example.com', 3.8, 'Hostel', 'Cozy Nest Hostel'),
    (4, 46, 'Hostel Avenue', 55, 'urban6@example.com', 3.9, 'Hostel', 'Urban Stay Inn'),
    (4, 47, 'Ocean Drive', 70, 'urban7@example.com', 4.5, 'Resort', 'Seaside Grand Resort'),
    (4, 48, 'Coastal Road', 65, 'urban8@example.com', 4.3, 'Resort', 'Wavefront Retreat'),
    
    -- Sunset Resorts
    (5, 51, 'Coastal Road', 120, 'sunset1@example.com', 5, 'Resort', 'Golden Sands Resort'),
    (5, 52, 'Beachfront Ave', 110, 'sunset2@example.com', 4.8, 'Resort', 'Azure Horizon Resort'),
    (5, 53, 'Palm Street', 100, 'sunset3@example.com', 4.9, 'Resort', 'Palm Cove Retreat'),
    (5, 54, 'Luxury Beach', 95, 'sunset4@example.com', 5, 'Luxury', 'Luxury Beachfront Hotel'),
    (5, 55, 'Luxury Beach', 90, 'sunset5@example.com', 4.7, 'Luxury', 'Prestige Seaview Suites'),
    (5, 56, 'Budget Coast', 40, 'sunset6@example.com', 3.5, 'Hostel', 'Coastal Budget Lodge'),
    (5, 57, 'Budget Coast', 30, 'sunset7@example.com', 3.6, 'Hostel', 'Seaside Hostel Inn'),
    (5, 58, 'Palm Street', 50, 'sunset8@example.com', 4.0, 'Hostel', 'Palm Grove Hostel');



INSERT INTO Rooms (hotel_id, room_num, price, capacity, view, extendable, issues, status) VALUES
    (1, 101, 150.00, 'Single', 'Sea', true, NULL, 'Free'),
    (1, 102, 200.00, 'Double', 'Mountain', false, 'Leaky faucet', 'Booked'),
    (1, 103, 180.00, 'Single', 'Mountain', true, NULL, 'Occupied'),
    (1, 104, 250.00, 'Double', 'Sea', false, 'Broken AC', 'Free'),
    (1, 105, 220.00, 'Double', 'Mountain', true, NULL, 'Free'),
    
    (2, 201, 130.00, 'Single', 'Sea', false, NULL, 'Free'),
    (2, 202, 190.00, 'Double', 'Mountain', true, NULL, 'Occupied'),
    (2, 203, 210.00, 'Double', 'Sea', false, 'Flickering lights', 'Booked'),
    (2, 204, 170.00, 'Single', 'Mountain', true, NULL, 'Free'),
    (2, 205, 180.00, 'Double', 'Sea', false, NULL, 'Occupied'),
    
    (3, 301, 80.00, 'Single', 'Sea', false, NULL, 'Free'),
    (3, 302, 90.00, 'Single', 'Mountain', false, NULL, 'Occupied'),
    (3, 303, 100.00, 'Double', 'Sea', true, 'Creaky bed', 'Booked'),
    (3, 304, 95.00, 'Double', 'Mountain', true, NULL, 'Free'),
    (3, 305, 120.00, 'Double', 'Sea', false, NULL, 'Free'),

    (4, 401, 175.00, 'Single', 'Sea', false, NULL, 'Free'),
    (4, 402, 220.00, 'Double', 'Mountain', true, NULL, 'Booked'),
    (4, 403, 190.00, 'Double', 'Sea', false, 'Noisy AC', 'Occupied'),
    (4, 404, 230.00, 'Single', 'Mountain', true, NULL, 'Free'),
    (4, 405, 200.00, 'Double', 'Sea', false, NULL, 'Free'),
    
    (5, 501, 160.00, 'Single', 'Mountain', false, NULL, 'Occupied'),
    (5, 502, 210.00, 'Double', 'Sea', true, 'Leaky roof', 'Booked'),
    (5, 503, 195.00, 'Double', 'Mountain', false, NULL, 'Free'),
    (5, 504, 220.00, 'Single', 'Sea', true, NULL, 'Free'),
    (5, 505, 250.00, 'Double', 'Mountain', false, NULL, 'Occupied');

INSERT INTO Customers (government_id_type, government_id, first_name, last_name, street_number, street_name, registration_date) VALUES
('ssn', '123-45-6789', 'John', 'Doe', 123, 'Broadway', '2023-01-01'),
('driver’s license', 'D12345678', 'Jane', 'Smith', 456, 'Park Ave', '2023-02-01');

INSERT INTO Employees (hotel_id, first_name, last_name, street_number, street_name, sin, role) VALUES
(1, 'Alice', 'Brown', 789, 'Elm St', 'SIN123456', 'Managers'),
(2, 'Bob', 'Johnson', 234, 'Maple St', 'SIN987654', 'Receptionist');