use crate::schema::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct Note {
    pub id: i32,
    pub title: String,
}

#[derive(Insertable, Debug)]
#[table_name = "notes"]
pub struct NewNote<'a> {
    pub title: &'a str,
}
