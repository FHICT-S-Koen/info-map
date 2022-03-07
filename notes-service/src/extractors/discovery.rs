use actix_web::web::Data;
use eureka_client::{BaseConfig, EurekaClient, PortData};

pub fn init_eureka(port: u16) -> Data<EurekaClient> {
    let mut config = BaseConfig::default();
    // config.instance.ip_addr = "0.0.0.0".to_string(); // TODO: check if inside a container this line needs to be uncommented
    config.instance.port = Some(PortData::new(port, true));
    let eureka = EurekaClient::new(config);
    eureka.start();
    Data::new(eureka)
}