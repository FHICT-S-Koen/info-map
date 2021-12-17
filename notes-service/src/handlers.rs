use super::models::{Note};
use super::Pool;
use crate::schema::notes::dsl::notes;
use actix_web::{Error, HttpResponse, web, get};
use crate::diesel::QueryDsl;
use crate::diesel::RunQueryDsl;
use std::vec::Vec;

#[get("/{mapUuid}")]
pub async fn get_notes_by_map_id(db: web::Data<Pool>, map_id: web::Path<uuid::Uuid>) -> Result<HttpResponse, Error> {
    Ok(web::block(move || get_all_notes_by_map_id(db, map_id.into_inner()))
        .await
        .map(|note| HttpResponse::Ok().json(note))
        .map_err(|_| HttpResponse::InternalServerError())?)
}

fn get_all_notes_by_map_id(pool: web::Data<Pool>, map_id: uuid::Uuid) -> Result<Vec<Note>, diesel::result::Error> {
    let conn = pool.get().unwrap();
    notes.select(map_id).load::<Note>(&conn)
    // let items = notes.load::<Note>(&conn)?;
    // Ok(items)
}
