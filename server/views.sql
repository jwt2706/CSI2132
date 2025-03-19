DROP VIEW IF EXISTS available_rooms;

CREATE VIEW available_rooms AS
SELECT h.area, COUNT(r.room_num) 
FROM hotels h 
JOIN rooms r ON h.id = r.hotel_id 
GROUP BY h.area