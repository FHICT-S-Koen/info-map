#[macro_use]
extern crate diesel;

use actix_web::{App, HttpServer};

mod api;
mod extractors;
mod middlewares;
mod types;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::from_path(".env.local").ok();
    let pool = extractors::init_pool("DATABASE_URL");
    let port = std::env::var("PORT")
        .expect("PORT must be set")
        .parse::<u16>()
        .expect("PORT must be of type u16");

    HttpServer::new(move || {
        App::new()
            .app_data(pool.clone())
            .app_data(extractors::init_eureka(port)) // api requests blocked if there's no eureka server available
            .service(api::routes())
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
