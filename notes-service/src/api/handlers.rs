use crate::{
    api::{actions, types::NewNote},
    types::Pool,
};
use actix_web::{
    get, post,
    web::{self, Data, Json, Path},
    Error, HttpResponse,
};
use uuid::Uuid;

#[get("/{map_id}")]
pub async fn get_notes_by_map_id(id: Path<Uuid>, pool: Data<Pool>) -> Result<HttpResponse, Error> {
    Ok(
        web::block(move || actions::get_all_notes_by_map_id(*id, &pool.get().unwrap()))
            .await?
            .map(|notes| HttpResponse::Ok().json(notes))
            .map_err(|err| actix_web::error::ErrorInternalServerError(err))?,
    )
}

#[post("/")]
pub async fn add_note(item: Json<NewNote>, pool: Data<Pool>) -> Result<HttpResponse, Error> {
    Ok(
        web::block(move || actions::create_note(&item, &pool.get().unwrap()))
            .await?
            .map(|note| HttpResponse::Created().json(note))
            .map_err(|err| actix_web::error::ErrorInternalServerError(err))?,
    )
}
