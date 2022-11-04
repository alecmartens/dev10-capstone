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

