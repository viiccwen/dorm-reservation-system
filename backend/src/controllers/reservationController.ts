import client from "../database/client";
import FormateTime from "../utils/timeFormatter";

// create a reservation
export const CreateReservation = async (req: any, res: any) => {
  try {
    // check if the room is already reserved or already checked
    const { room_id } = req.body;
    const check_query =
      "SELECT * FROM reservations WHERE room_id = $1 ORDER BY create_at DESC LIMIT 1";
    const check_values = [room_id];
    const check_result = await client.query(check_query, check_values);
    if (
      check_result.rows.length > 0 &&
      (check_result.rows[0].is_pass === true ||
        check_result.rows[0].is_checked === false)
    ) {
      let error_message = "";
      if (check_result.rows[0].is_checked === false) {
        error_message = "此床號已被登記，請等待檢查。";
      } else if (check_result.rows[0].is_pass === true) {
        error_message = "此床號已通過檢查，無須再次檢查。";
      }
      res.status(400).json({ error: error_message });
      return;
    }

    // create a reservation
    const insert_query =
      "INSERT INTO reservations (room_id, is_checked, is_pass) VALUES ($1, $2, $3)";
    const insert_values = [room_id, false, false];
    const insert_result = await client.query(insert_query, insert_values);

    res.status(201).json(insert_result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get all reservations
export const GetAllReservations = async (req: any, res: any) => {
  try {
    const query = "SELECT * FROM reservations ORDER BY create_at DESC";
    const result = await client.query(query);

    const formatted_result = result.rows.map((row: any) => ({
      ...row,
      create_at: FormateTime(row.create_at),
    }));

    res.status(200).json(formatted_result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// update a reservation
export const UpdateReservation = async (req: any, res: any) => {
  try {
    const { id, is_checked, is_pass, check_person } = req.body;
    const query =
      "UPDATE reservations SET is_checked = $1, is_pass = $2, check_person = $3 WHERE id = $4";
    const values = [is_checked, is_pass, check_person, id];
    const result = await client.query(query, values);

    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
