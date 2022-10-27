package learn.capstone.models;

import java.math.BigDecimal;

public class Service {
    private int serviceId;
    private String name;
    private String description;
    private double pricePerHour;
    private ServiceCategory category; //TODO: change to enum

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(double pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

    public ServiceCategory getCategory() {
        return category;
    }

    public void setCategory(ServiceCategory category) {
        this.category = category;
    }
}

//    create table service (
//        service_id int primary key auto_increment,
//        name varchar(100) not null,
//        description varchar(300),
//        price_per_hour decimal(8,2) not null,
//        category varchar(100),
//        constraint uq unique (name, description, price_per_hour)
//        );