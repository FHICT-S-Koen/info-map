use diesel::prelude::*;
use uuid::Uuid;

use crate::api::schema::notes;
use crate::api::schema::notes::dsl::notes as all_notes;
use crate::api::types::{NewNote, Note};

pub fn get_all_notes_by_map_id(
    map_id: Uuid,
    conn: &PgConnection,
) -> Result<Vec<Note>, diesel::result::Error> {
    all_notes
        .filter(notes::map_id.eq_all(map_id))
        .load::<Note>(conn)
}

pub fn create_note(note: &NewNote, conn: &PgConnection) -> Result<Note, diesel::result::Error> {
    let res = diesel::insert_into(notes::table)
        .values(note)
        .get_result(conn)?;
    Ok(res)
}
