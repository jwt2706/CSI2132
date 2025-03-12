DROP FUNCTION IF EXISTS update_room_availability CASCADE;


DROP TRIGGER IF EXISTS booking_made ON bookings;


CREATE OR REPLACE FUNCTION update_room_availability() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM RoomAvailableDates
    WHERE room_num = NEW.room_num
    AND hotel_id = NEW.hotel_id
    AND room_available_date >= NEW.start_date
    AND room_available_date <= NEW.end_date;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER booking_made AFTER
INSERT ON bookings
FOR EACH ROW EXECUTE FUNCTION update_room_availability();

-------------------------------------------------------------------------

DROP FUNCTION IF EXISTS add_room_availability CASCADE;


DROP TRIGGER IF EXISTS room_added ON rooms;


CREATE OR REPLACE FUNCTION add_room_availability() RETURNS TRIGGER AS $$
DECLARE
    date_iter DATE;

BEGIN
    date_iter := CURRENT_DATE;
    WHILE date_iter <= CURRENT_DATE + INTERVAL '1 month'
    LOOP
        INSERT INTO RoomAvailableDates(hotel_id,room_num,room_available_date)
        VALUES (NEW.hotel_id,
                NEW.room_num,
                date_iter)
        ON CONFLICT (hotel_id, room_num, room_available_date) DO NOTHING;

        date_iter := date_iter + INTERVAL '1 day';
    END LOOP;

    RETURN NEW;
END;
$$LANGUAGE plpgsql;


CREATE TRIGGER room_added AFTER
INSERT ON rooms
FOR EACH ROW EXECUTE FUNCTION add_room_availability();