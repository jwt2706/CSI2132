DROP VIEW IF EXISTS available_rooms;

CREATE VIEW available_rooms AS
SELECT hc.hotel_chain_name, h.hotel_name,h.street_number,h.street_name, r.room_num, r.price, r.capacity, r.view, r.extendable, r.issues, a.room_available_date
FROM rooms r
JOIN hotels h ON r.hotel_id = h.id
JOIN hotelchains hc ON hc.id = h.hotel_chain_id
JOIN roomavailabledates a ON r.hotel_id = a.hotel_id AND r.room_num = a.room_num
WHERE a.room_available_date >= CURRENT_DATE