#[macro_use]
extern crate diesel;

use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

extern crate eureka_client;

use actix_web::{web::scope, App, HttpServer};
use actix_web_httpauth::middleware::HttpAuthentication;
use auth::validator;

mod auth;
mod errors;
mod handlers;
mod models;
mod schema;
mod discovery;

use handlers::{
    add_note, 
    // delete_note, 
    // get_note_by_id, 
    get_notes_by_map_id
};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    std::env::set_var("RUST_LOG", "actix_web=debug");
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let port = std::env::var("PORT")
        .expect("PORT must be set")
        .parse::<u16>()
        .expect("PORT must be of type u16");

    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: Pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    HttpServer::new(move || {
        let auth = HttpAuthentication::bearer(validator);
        App::new()
            // .wrap(auth)
            .data(discovery::init_eureka(port)) // api can't be called when registering to non existing eureka server
            .data(pool.clone())
            .service(scope("/api/v1/note")
                .service(get_notes_by_map_id)
                .service(add_note)
                // .service(get_note_by_id)
                // .service(delete_note)
        )
            
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
