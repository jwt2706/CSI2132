DROP VIEW IF EXISTS available_rooms;

CREATE VIEW available_rooms AS
SELECT h.area, COUNT(r.room_num) 
FROM hotels h 
JOIN rooms r ON h.id = r.hotel_id 
GROUP BY h.area;


DROP VIEW IF EXISTS total_hotel_capacity;

CREATE VIEW total_hotel_capacity AS
SELECT h.hotel_name, SUM(CASE WHEN r.capacity ='Single' THEN 1 WHEN r.capacity = 'Double' THEN 2 WHEN r.capacity = 'Triple' THEN 3 WHEN r.capacity ='Suite' THEN 4 WHEN r.capacity = 'Penthouse' THEN 5 ELSE 1 END)
FROM rooms r
JOIN hotels h ON h.id = r.hotel_id
GROUP BY h.hotel_name;
