use super::models::{Note, NewNote};
use super::Pool;
use actix_web::{Error, HttpResponse, web::{self, Json, Path, Data}, get, post};
use uuid::Uuid;

#[get("/{map_id}")]
pub async fn get_notes_by_map_id(id: Path<Uuid>, pool: Data<Pool>) -> Result<HttpResponse, Error> {
    Ok(web::block(move || Note::get_all_by_map_id(*id, &pool.get().unwrap())).await
        .map(|note| HttpResponse::Ok().json(note))
        .map_err(|_| HttpResponse::InternalServerError().json("Internal Server Error, Please try later"))?
    )
}

#[post("/")]
pub async fn add_note(item: Json<NewNote>, pool: Data<Pool>) -> Result<HttpResponse, Error> {
    Ok(web::block(move || Note::insert(&item, &pool.get().unwrap())).await
        .map(|note| HttpResponse::Created().json(note))
        .map_err(|_| HttpResponse::InternalServerError().json("Internal Server Error, Please try later"))?
    )
}
