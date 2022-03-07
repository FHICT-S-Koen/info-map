use actix_web::{web, Scope};

use super::handlers;

pub fn routes() -> Scope {
    web::scope("/api/v1/note")
        .service(handlers::get_notes_by_map_id)
        .service(handlers::add_note)
}
