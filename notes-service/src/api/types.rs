use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::api::schema::notes;

#[derive(Queryable, Deserialize, Serialize, Debug)]
pub struct Note {
    pub id: Uuid,
    pub map_id: Uuid,
    pub title: String,
}

#[derive(Queryable, Deserialize, Insertable, Debug)]
#[table_name = "notes"]
pub struct NewNote {
    pub map_id: Uuid,
    pub title: String,
}
