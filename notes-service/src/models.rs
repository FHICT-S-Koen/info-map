use crate::schema::notes;
use serde::{Deserialize, Serialize};
use diesel::{Queryable, Insertable};
use uuid::Uuid;

#[derive(Debug, Clone, Queryable, Serialize, Deserialize)]
pub struct Note {
    pub id: Uuid,
    pub map_id: Uuid,
    pub title: String
}

#[derive(Debug, Clone, Insertable, Serialize, Deserialize)]
#[table_name="notes"]
pub struct NewNote {
    pub id: Uuid,
    pub map_id: Uuid,
    pub title: String
}