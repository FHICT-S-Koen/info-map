use actix_web::web::Data;
use eureka_client::{BaseConfig, EurekaClient};

pub fn init_eureka() -> Data<EurekaClient> {
    let eureka = EurekaClient::new(BaseConfig::default());
    eureka.start();
    Data::new(eureka)
}