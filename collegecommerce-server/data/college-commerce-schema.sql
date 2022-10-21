drop database if exists college_commerce;
create database college_commerce;
use college_commerce;

create table user_info (
	user_id int primary key auto_increment,
    username varchar(50) not null,
    email varchar(200) not null,
    password_hash varchar(1024) not null,
    image_url varchar(512) null
);

create table item (
	item_id int primary key auto_increment,
    name varchar(100) not null,
    price decimal not null,
    description varchar(300),
    item_condition varchar(50),
    item_sold boolean,
    category varchar(100),
    image_url varchar(512) null
);

create table service (
	service_id int primary key auto_increment,
    name varchar(100) not null,
    description varchar(300),
    price_per_hour decimal not null,
    category varchar(100)
);

create table listing (
	listing_id int primary key auto_increment,
    is_available boolean,
    user_id int not null,
    item_id int,
    service_id int,
    constraint fk_listing_user_id
		foreign key (user_id)
        references user_info(user_id),
	constraint fk_listing_item_id
		foreign key (item_id)
        references item(item_id),
	constraint fk_listing_service_id
		foreign key (service_id)
        references service(service_id)
);

create table location (
	location_id int primary key auto_increment,
    user_id int,
    `name` varchar(25) not null,
    address varchar(125) not null,
    city varchar(50) not null,
	region varchar(25) null,
    country_code varchar(5) not null,
    postal_code varchar(15) not null,
    constraint fk_listing_user_id
		foreign key (user_id)
        references user_info(user_id)
);