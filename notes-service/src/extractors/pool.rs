use std::env;

use actix_web::web::Data;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

use crate::types::Pool;

pub fn init_pool(env_var: &str) -> Data<Pool> {
    let manager =
        ConnectionManager::<PgConnection>::new(env::var(env_var).expect(env_var));
    Data::new(r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool."))
}
