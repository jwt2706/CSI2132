-- Insert into HotelChains
INSERT INTO HotelChains (hotel_chain_name, street_number, street_name, num_hotels) VALUES
    ('Luxury Stays', 123, 'Main St', 8),
    ('Mountain Resorts', 456, 'Park Ave', 8),
    ('Sunny Hostels', 789, 'Beach Rd', 8),
    ('City Comfort', 101, 'Downtown Blvd', 8),
    ('Global Inns', 202, 'Global Lane', 8);

-- Insert into HotelChainPhoneNumbers
INSERT INTO HotelChainPhoneNumbers (hotel_chain_id, phone_number) VALUES
    (1, '123-456-7890'), 
    (2, '234-567-8901'), 
    (3, '345-678-9012'),
    (4, '456-789-0123'), 
    (5, '567-890-1234');

-- Insert into HotelChainEmails
INSERT INTO HotelChainEmails (hotel_chain_id, email) VALUES
    (1, 'info@luxurystays.com'), 
    (2, 'contact@mountainresorts.com'),
    (3, 'hello@sunnyhostels.com'),
    (4, 'support@citycomfort.com'),
    (5, 'admin@globalinns.com');

-- Insert into Hotels
INSERT INTO Hotels (hotel_chain_id, street_number, street_name, num_rooms, email, stars, category, hotel_name, area) VALUES
(1, 100, 'Ocean Drive', 5, 'lux1@example.com', 5.0, 'Luxury', 'Luxury Stays Oceanfront', 'Downtown'),
(1, 200, 'Mountain Road', 5, 'lux2@example.com', 4.5, 'Resort', 'Luxury Mountain Retreat', 'Beach'),
(1, 300, 'Downtown Street', 5, 'lux3@example.com', 2.0, 'Hostel', 'Luxury Downtown Hostel', 'Suburb'),
(1, 400, 'Beach Blvd', 5, 'lux4@example.com', 5.0, 'Luxury', 'Luxury Beach Palace', 'Downtown'),
(1, 500, 'Lake View', 5, 'lux5@example.com', 4.0, 'Resort', 'Luxury Lakeside Resort', 'Beach'),
(1, 500, 'Lake View', 5, 'lux6@example.com', 3.0, 'Hostel', 'Luxury Lakeside Hostel', 'Beach'),
(1, 600, 'City Center', 5, 'lux7@example.com', 4.5, 'Luxury', 'Luxury City Center', 'Suburb'),
(1, 700, 'Hillside Ave', 5, 'lux8@example.com', 4.0, 'Resort', 'Luxury Hillside Resort','Downtown'),

(2, 100, 'Alpine Way', 5, 'mtn1@example.com', 4.5, 'Resort', 'Mountain Alpine Lodge','Downtown'),
(2, 200, 'Valley Road', 5, 'mtn2@example.com', 3.0, 'Hostel', 'Mountain Valley Hostel','Beach'),
(2, 300, 'Summit Peak', 5, 'mtn3@example.com', 5.0, 'Luxury', 'Mountain Summit Luxury','Suburb'),
(2, 300, 'Summit Peak', 5, 'mtn4@example.com', 4.0, 'Resort', 'Mountain Summit View','Suburb'),
(2, 400, 'Forest Lane', 5, 'mtn5@example.com', 2.0, 'Hostel', 'Mountain Forest Hostel','Downtown'),
(2, 500, 'Cliffside Drive', 5, 'mtn6@example.com', 4.5, 'Luxury', 'Mountain Cliffside','Beach'),
(2, 600, 'Meadow Path', 5, 'mtn7@example.com', 3.5, 'Resort', 'Mountain Meadow Retreat','Suburb'),
(2, 700, 'Canyon Road', 5, 'mtn8@example.com', 4.0, 'Luxury', 'Mountain Canyon Luxury','Downtown'),

(3, 100, 'Palm Street', 5, 'sun1@example.com', 1.5, 'Hostel', 'Sunny Palm Hostel','Downtown'),
(3, 200, 'Sunset Blvd', 5, 'sun2@example.com', 3.0, 'Resort', 'Sunny Sunset Resort','Beach'),
(3, 300, 'Boardwalk', 5, 'sun3@example.com', 4.0, 'Luxury', 'Sunny Boardwalk Luxury','Suburb'),
(3, 400, 'Surfside Ave', 5, 'sun4@example.com', 2.0, 'Hostel', 'Sunny Surfside Hostel','Downtown'),
(3, 500, 'Harbor View', 5, 'sun5@example.com', 4.5, 'Resort', 'Sunny Harbor Resort','Beach'),
(3, 600, 'Paradise Lane', 5, 'sun6@example.com', 3.5, 'Hostel', 'Sunny Paradise Hostel','Suburb'),
(3, 700, 'Coral Road', 5, 'sun7@example.com', 5.0, 'Luxury', 'Sunny Coral Luxury','Downtown'),
(3, 700, 'Coral Road', 5, 'sun8@example.com', 4.0, 'Resort', 'Sunny Coral Resort','Downtown'),

(4, 100, 'Metro Plaza', 5, 'city1@example.com', 3.0, 'Hostel', 'City Metro Hostel','Downtown'),
(4, 100, 'Metro Plaza', 5, 'city2@example.com', 4.0, 'Luxury', 'City Metro Luxury','Downtown'),
(4, 200, 'Central Park', 5, 'city3@example.com', 4.5, 'Resort', 'City Central Resort','Beach'),
(4, 300, 'Urban Avenue', 5, 'city4@example.com', 2.5, 'Hostel', 'City Urban Hostel','Suburb'),
(4, 400, 'Downtown Square', 5, 'city5@example.com', 5.0, 'Luxury', 'City Downtown Luxury','Downtown'),
(4, 500, 'Riverside Drive', 5, 'city6@example.com', 3.5, 'Resort', 'City Riverside Resort','Beach'),
(4, 600, 'Market Street', 5, 'city7@example.com', 4.0, 'Luxury', 'City Market Luxury','Suburb'),
(4, 700, 'Garden Lane', 5, 'city8@example.com', 3.0, 'Hostel', 'City Garden Hostel','Downtown'),

(5, 100, 'World Way', 5, 'glob1@example.com', 4.0, 'Resort', 'Global World Resort','Downtown'),
(5, 200, 'International Drive', 5, 'glob2@example.com', 3.0, 'Hostel', 'Global International Hostel','Beach'),
(5, 300, 'Continental Blvd', 5, 'glob3@example.com', 5.0, 'Luxury', 'Global Continental Luxury','Suburb'),
(5, 400, 'Global Circle', 5, 'glob4@example.com', 4.5, 'Resort', 'Global Circle Resort','Downtown'),
(5, 400, 'Global Circle', 5, 'glob5@example.com', 2.0, 'Hostel', 'Global Circle Hostel','Downtown'),
(5, 500, 'Nation Street', 5, 'glob6@example.com', 4.0, 'Luxury', 'Global Nation Luxury','Beach'),
(5, 600, 'Union Square', 5, 'glob7@example.com', 3.5, 'Resort', 'Global Union Resort','Suburb'),
(5, 700, 'Peace Avenue', 5, 'glob8@example.com', 4.0, 'Hostel', 'Global Peace Hostel','Downtown');

-- Insert into HotelPhoneNumbers
DO $$
DECLARE 
    base_number BIGINT := 8005551000;  -- Starting number
BEGIN
    FOR hotel_id IN 1..40 LOOP
        INSERT INTO HotelPhoneNumbers (hotel_id, phone_number)
        VALUES (
            hotel_id,
            format('(%s) %s-%s', 
                   substr(base_number::text, 1, 3),
                   substr(base_number::text, 4, 3),
                   substr(base_number::text, 7, 4))
        );
        base_number := base_number + 1;  -- Increment for next hotel
    END LOOP;
END;
$$;

-- Insert into Rooms

DO $$
DECLARE 
    h_id INT;  -- Avoid conflict with column name
    room_capacities TEXT[] := ARRAY['Single','Double','Triple','Suite','Penthouse'];
BEGIN
    FOR h_id IN 1..40 LOOP
        FOR i IN 1..5 LOOP
            INSERT INTO Rooms (
                hotel_id, 
                room_num, 
                price, 
                capacity, 
                view, 
                extendable, 
                issues, 
                status
            )
            VALUES (
                h_id,
                100 + i,
                CASE 
                    WHEN room_capacities[i] = 'Single' THEN 80.00
                    WHEN room_capacities[i] = 'Double' THEN 120.00
                    WHEN room_capacities[i] = 'Triple' THEN 160.00
                    WHEN room_capacities[i] = 'Suite' THEN 250.00
                    ELSE 400.00  -- Penthouse
                END,
                room_capacities[i],
                CASE WHEN i % 2 = 0 THEN 'Sea' ELSE 'Mountain' END,
                i > 2,  -- Extendable for rooms 103+
                CASE WHEN random() < 0.1 THEN 'Minor maintenance needed' END,
                CASE 
                    WHEN random() < 0.2 THEN 'Booked'
                    WHEN random() < 0.3 THEN 'Occupied'
                    ELSE 'Free'
                END
            );
        END LOOP;
    END LOOP;
END;
$$;

-- Insert into RoomAmenities
DO $$
DECLARE 
    h_id INT;  
    r_num INT;  -- Renamed variable to avoid conflict with column name
BEGIN
    FOR h_id IN 1..40 LOOP
        FOR r_num IN 101..105 LOOP  -- Use renamed variable
            INSERT INTO RoomAmenities (hotel_id, room_num, has_tv, has_ac, has_fridge, has_safe)
            VALUES (
                h_id,
                r_num,  -- Use renamed variable
                TRUE,
                r_num >= 102,  -- AC for Double+
                r_num >= 103,  -- Fridge for Triple+
                r_num >= 104   -- Safe for Suite/Penthouse
            )
            ON CONFLICT (hotel_id, room_num) DO NOTHING;  -- Now refers unambiguously to table columns
        END LOOP;
    END LOOP;
END;
$$;

-- Insert Customers
INSERT INTO Customers (government_id_type, government_id, first_name, last_name, street_number, street_name) VALUES
('ssn', '300152646', 'Xavier', 'Lermusieaux', 123, 'Street'),
('sin', '123-456-789','Sacha', 'Arseneault', 321, 'Avenue'),
('HC', '987654321', 'Jacob', 'Dusty', 456, 'Boulevard');