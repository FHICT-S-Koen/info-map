use super::models::{NewNote, Note};
use super::schema::notes::dsl::*;
use super::Pool;
use crate::diesel::QueryDsl;
use crate::diesel::RunQueryDsl;
use actix_web::{Error, HttpResponse, web, get, post, delete};
use diesel::dsl::{delete, insert_into};
use serde::{Deserialize, Serialize};
use std::vec::Vec;

#[derive(Debug, Serialize, Deserialize)]
pub struct InputNote {
    pub title: String,
}

#[get("")]
pub async fn get_notes(db: web::Data<Pool>) -> Result<HttpResponse, Error> {
    Ok(web::block(move || get_all_notes(db))
        .await
        .map(|note| HttpResponse::Ok().json(note))
        .map_err(|_| HttpResponse::InternalServerError())?)
}

fn get_all_notes(pool: web::Data<Pool>) -> Result<Vec<Note>, diesel::result::Error> {
    let conn = pool.get().unwrap();
    let items = notes.load::<Note>(&conn)?;
    Ok(items)
}

#[get("{id}")]
pub async fn get_note_by_id(
    db: web::Data<Pool>,
    note_id: web::Path<i32>,
) -> Result<HttpResponse, Error> {
    Ok(
        web::block(move || db_get_note_by_id(db, note_id.into_inner()))
            .await
            .map(|note| HttpResponse::Ok().json(note))
            .map_err(|_| HttpResponse::InternalServerError())?,
    )
}

fn db_get_note_by_id(pool: web::Data<Pool>, note_id: i32) -> Result<Note, diesel::result::Error> {
    let conn = pool.get().unwrap();
    notes.find(note_id).get_result::<Note>(&conn)
}

#[post("")]
pub async fn add_note(
    db: web::Data<Pool>,
    item: web::Json<InputNote>,
) -> Result<HttpResponse, Error> {
    Ok(web::block(move || add_single_note(db, item))
        .await
        .map(|note| HttpResponse::Created().json(note))
        .map_err(|_| HttpResponse::InternalServerError())?)
}

fn add_single_note(
    db: web::Data<Pool>,
    item: web::Json<InputNote>,
) -> Result<Note, diesel::result::Error> {
    let conn = db.get().unwrap();
    let new_note = NewNote {
        title: &item.title
    };
    let res = insert_into(notes).values(&new_note).get_result(&conn)?;
    Ok(res)
}

#[delete("{id}")]
pub async fn delete_note(
    db: web::Data<Pool>,
    note_id: web::Path<i32>,
) -> Result<HttpResponse, Error> {
    Ok(
        web::block(move || delete_single_note(db, note_id.into_inner()))
            .await
            .map(|note| HttpResponse::Ok().json(note))
            .map_err(|_| HttpResponse::InternalServerError())?,
    )
}

fn delete_single_note(db: web::Data<Pool>, note_id: i32) -> Result<usize, diesel::result::Error> {
    let conn = db.get().unwrap();
    let count = delete(notes.find(note_id)).execute(&conn)?;
    Ok(count)
}
