drop database if exists college_commerce;
create database college_commerce;
use college_commerce;

create table user_info (
	user_id int primary key auto_increment,
    username varchar(50) not null,
    email varchar(200) not null,
    password_hash varchar(1024) not null,
    image_url varchar(512) null, 
    constraint uq unique (username, email)
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

create table listing (
	listing_id int primary key auto_increment,
    is_available boolean,
    user_id int not null,
    item_id int,
    service_id int,
    constraint fk_listing_user_id
		foreign key (user_id)
        references user_info(user_id),
	-- constraint fk_listing_item_id
-- 		foreign key (item_id)
--         references item(item_id),
-- 	constraint fk_listing_service_id
-- 		foreign key (service_id)
--         references service(service_id), 
    constraint uq unique (user_id, item_id, service_id)
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
    constraint fk_location_user_id
		foreign key (user_id)
        references user_info(user_id)
);
create table college_info(
	`name` varchar(150) not null, 
    address varchar(150) not null, 
    constraint uq unique (`name`, address)
); 
insert into college_info(`name`, address)
select distinct LocationName, Address from imports; 
select * from college_info; 
delimiter //
create procedure set_known_good_state()
begin
insert into service(name, description, price_per_hour, category) 
values ("delivering food", "pizza", 50.00,"food"),
 ("pet service", "any pet", 50.00,"pets"),
 ("setup fridge", "lift anything under 100 lbs", 50.00,"furniture"); 
 
 insert into item(name, price, description, item_condition, item_sold, category)
values ("desk", 150.50, "wooden desk, two drawers", "like new", false, "furniture"),
("Calculus Textbook", 150.50, "8th edition, 500 pages", "good", false, "textbook"),
("Sofa", 150.50, "10' width, gray", "new", false, "furniture"),
("Chair", 151.50, "small, gray", "new", false, "furniture"),
("Bike", 152.50, "Black, light", "new", false, "outdoor");  

insert into user_info(username, email, password_hash)
values("johnnyappleseed", "johnnyappleseed@apple.com", "apple"),
("georgewashington","georgewashington@gmail.com","george"),
("billyjoel","joelbilly@hotmail.com","bill");

insert into listing(is_available, user_id, item_id, service_id)
values(true, 1, 1, 0),
(false,2,0,1),
(true,3,2,0);

end //
-- 4. Change the statement terminator back to the original.
delimiter ;
SET SQL_SAFE_UPDATES = 0;
call set_known_good_state(); 
-- select * from service; 
-- delete from service; 



