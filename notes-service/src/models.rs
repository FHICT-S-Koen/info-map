use diesel::{self, insert_into};
use diesel::prelude::*;
use diesel::pg::PgConnection;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::schema::notes;
use crate::schema::notes::dsl::notes as all_notes;

#[derive(Queryable, Deserialize, Serialize)]
pub struct Note {
    pub id: Uuid,
    pub map_id: Uuid,
    pub title: String
}

#[derive(Queryable, Deserialize, Insertable)]
#[table_name="notes"]
pub struct NewNote {
    pub map_id: Uuid,
    pub title: String
}

impl Note {
    pub fn get_all_by_map_id(map_id: Uuid, conn: &PgConnection) -> Result<Vec<Note>, diesel::result::Error>  {
        all_notes
            .filter(notes::map_id.eq_all(map_id))
            .load::<Note>(conn)
    }

    pub fn insert(note: &NewNote, conn: &PgConnection) -> Result<Note, diesel::result::Error>  {
        let res = insert_into(notes::table).values(note).get_result(conn)?;
        Ok(res)
    }
}