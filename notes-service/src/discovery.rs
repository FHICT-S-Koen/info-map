use eureka_client::{BaseConfig, EurekaClient, PortData};

pub fn init_eureka(port: u16
) -> EurekaClient {
    let mut config = BaseConfig::default();
    config.instance.ip_addr = "localhost".to_string();
    config.instance.port = Some(PortData::new(port, true));
    let eureka = EurekaClient::new(config);
    eureka.start();
    eureka
}