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
    location varchar(200) not null,
    constraint uq unique (name , description)
);

create table service (
	service_id int primary key auto_increment,
    name varchar(100) not null,
    description varchar(300),
    price_per_hour decimal(8,2) not null,
    category varchar(100), 
    user_id int not null,
    is_available boolean,
    location varchar(200) not null,
    constraint uq unique (name, description, price_per_hour)
);

insert into app_role (app_role_id, name) values (1, "USER"), (2, "ADMIN");


delimiter //
create procedure set_known_good_state()
begin
	SET FOREIGN_KEY_CHECKS = 0;
    truncate table app_user_role;
	truncate table user_info;
    truncate table service;
	truncate table item;

insert into user_info (username, email, password_hash, image_url)
	values
	("JohnDoe", "johndoe@gmail.com", 
	"eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJidWctc2FmYXJpIiwic3ViIjoiYm9iQGpvbmVzLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjM4NzQ5NTU1fQ.mc6LUfd-80L2f5Do80-QlfYnwzn_JX3_CH3V31-yaEw",
	""),
	("JaneSmith", "janesmith24@gmail.com", 
	"eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJidWctc2FmYXJpIiwic3ViIjoiYm9iQGpvbmVzLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjM4NzQ5NTU1fQ.mc6LUfd-80L2f5Do80-QlfYnwzn_JX3_CH3V31-yaEw",
	"");

insert into app_user_role (user_id, app_role_id) 
	values (1, 1), (2, 2);
    
insert into service(name, description, price_per_hour, category, user_id, is_available, location)
    values ("delivering food", "pizza", 50.00,"DELIVERY",1,false, "North Dakota State University"),
    ("pet service", "any pet", 50.00,"REPAIR",1,true, "North Dakota State University"),
    ("setup fridge", "lift anything under 100 lbs", 50.00,"OTHER",2,true, "University of Minnesota");
    
insert into item(name, price, description, item_condition, item_sold, category, user_id, is_available, location)
	values ("desk", 150.50, "wooden desk, two drawers", "NEW", false, "FURNITURE", 1, true, "North Dakota State University"),
	("Calculus Textbook", 150.50, "8th edition, 500 pages", "GOOD", false, "BOOKS", 1, true, "University of Minnesota"),
	("Sofa", 150.50, "10' width, gray", "NEW", false, "FURNITURE", 1, false, "University of Minnesota"),
	("Chair", 151.50, "small, gray", "USED", false, "FURNITURE", 2, true, "North Dakota State University"),
	("Bike", 152.50, "Black, light", "POOR", false, "SPORTS", 2, false, "North Dakota State University");

end //
delimiter ;
SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 1;
