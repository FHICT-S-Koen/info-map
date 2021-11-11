use std::pin::Pin;

use actix_web::{dev::ServiceRequest, web::scope, App, Error, HttpServer};
use actix_web_httpauth::{
    extractors::{AuthenticationError, bearer::{BearerAuth, Config}}, 
    middleware::HttpAuthentication
};

#[macro_use]
extern crate diesel;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

mod auth;
mod errors;
mod handlers;
mod models;
mod schema;

use handlers::{
    add_note, 
    delete_note, 
    get_note_by_id, 
    get_notes
};

async fn validator(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, Error> {
    let config = req
        .app_data::<Config>()
        .map(|data| Pin::new(data).get_ref().clone())
        .unwrap_or_else(Default::default);
    match auth::validate_token(credentials.token()) {
        Ok(res) => {
            if res {
                Ok(req)
            } else {
                Err(AuthenticationError::from(config).into())
            }
        }
        Err(_) => Err(AuthenticationError::from(config).into()),
    }
}

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
            .wrap(auth)
            .data(pool.clone())
            .service(scope("/api/v1")
                .service(get_notes)
                .service(get_note_by_id)
                .service(add_note)
                .service(delete_note)
        )
            
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
