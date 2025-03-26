DROP INDEX IF EXISTS idx_room_availability_date_range;

CREATE INDEX idx_room_availability_date_range 
ON RoomAvailableDates (room_available_date, hotel_id, room_num);

DROP INDEX IF EXISTS idx_hotels;

CREATE INDEX idx_hotels
ON Hotels (id, num_rooms, category, hotel_name);


DROP INDEX IF EXISTS idx_rooms;

CREATE INDEX idx_rooms 
ON Rooms (hotel_id, room_num, capacity);
