CREATE INDEX idx_room_availability_date_range 
ON RoomAvailableDates (room_available_date, hotel_id, room_num);