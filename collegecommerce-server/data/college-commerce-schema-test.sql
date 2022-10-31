drop database if exists college_commerce_test;
create database college_commerce_test;
use college_commerce_test;

create table user_info (
	user_id int primary key auto_increment,
    username varchar(50) not null,
    email varchar(200) not null,
    password_hash varchar(1024) not null,
    image_url varchar(512) null, 
    constraint uq unique (username, email)
);

create table app_role (
	app_role_id int primary key auto_increment,
    `name` varchar(20) not null unique
);

create table app_user_role (
	user_id int,
    app_role_id int,
    constraint pk_app_user_role
		primary key (user_id, app_role_id),
    constraint fk_app_user_role_user_id
		foreign key (user_id)
        references user_info(user_id),
	constraint fk_app_user_role_app_role_id
		foreign key (app_role_id)
        references app_role(app_role_id)
);

create table item (
	item_id int primary key auto_increment,
    name varchar(100) not null,
    price decimal(8,2) not null,
    description varchar(300),
    item_condition varchar(50),
    item_sold boolean,
    category varchar(100),
    image_url varchar(512) null,
    -- added
    user_id int not null,
    is_available boolean,
    constraint uq unique (name , description)
);

create table service (
	service_id int primary key auto_increment,
    name varchar(100) not null,
    description varchar(300),
    price_per_hour decimal(8,2) not null,
    category varchar(100), 
    constraint uq unique (name, description, price_per_hour)
);

-- create table listing (
-- 	listing_id int primary key auto_increment,
 --    is_available boolean,
 --    user_id int not null,
--     item_id int,
--     service_id int,
--     constraint fk_listing_user_id
-- 		foreign key (user_id)
--         references user_info(user_id),
	-- constraint fk_listing_item_id
-- 		foreign key (item_id)
--         references item(item_id),
-- 	constraint fk_listing_service_id
-- 		foreign key (service_id)
--         references service(service_id), 
--     constraint uq unique (user_id, item_id, service_id)
-- );

create table location (
	location_id int primary key auto_increment,
    user_id int,
    `name` varchar(25) not null,
    address varchar(125) not null,
    city varchar(50) not null,
	region varchar(25) null,
    country_code varchar(5) not null,
    postal_code varchar(15) not null,
    constraint fk_location_user_id
		foreign key (user_id)
        references user_info(user_id)
);
create table college_info(
	`name` varchar(150) not null, 
    address varchar(150) not null, 
    constraint uq unique (`name`, address)
); 
-- insert into college_info(`name`, address)
-- select distinct LocationName, Address from imports; 

insert into app_role (app_role_id, name) values (1, "USER"), (2, "ADMIN");

delimiter //
create procedure set_known_good_state()
begin
	SET FOREIGN_KEY_CHECKS = 0;
	truncate table user_info;
    truncate table service;
	truncate table item;
    truncate table listing;

	insert into user_info (username, email, password_hash, image_url)
		values
		("JohnDoe", "johndoe@gmail.com", 
        "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJidWctc2FmYXJpIiwic3ViIjoiYm9iQGpvbmVzLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjM4NzQ5NTU1fQ.mc6LUfd-80L2f5Do80-QlfYnwzn_JX3_CH3V31-yaEw",
        ""),
        ("JaneSmith", "janesmith24@gmail.com", 
        "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJidWctc2FmYXJpIiwic3ViIjoiYm9iQGpvbmVzLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjM4NzQ5NTU1fQ.mc6LUfd-80L2f5Do80-QlfYnwzn_JX3_CH3V31-yaEw",
        "");

    insert into service(name, description, price_per_hour, category)
    values ("delivering food", "pizza", 50.00,"food"),
    ("pet service", "any pet", 50.00,"pets"),
    ("setup fridge", "lift anything under 100 lbs", 50.00,"furniture");
    
   insert into item(name, price, description, item_condition, item_sold, category, user_id, is_available)
values ("desk", 150.50, "wooden desk, two drawers", "like new", false, "furniture", 1, false),
("Calculus Textbook", 150.50, "8th edition, 500 pages", "good", false, "textbook", 2, true),
("Sofa", 150.50, "10' width, gray", "new", false, "furniture", 1, false),
("Chair", 151.50, "small, gray", "new", false, "furniture", 2, true),
("Bike", 152.50, "Black, light", "new", false, "outdoor", 3, true);  

-- insert into listing(is_available, user_id, item_id, service_id)
-- values(true, 1, 1, 0),
-- (false,2,0,1),
-- (true,3,2,0); 

end //
delimiter ;
SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 1;
