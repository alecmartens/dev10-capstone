set sql_safe_updates = 0; 
insert into item(name, price, description, item_condition, item_sold, category)
values ("desk", 150.50, "wooden desk, two drawers", "like new", false, "furniture"),
("Calculus Textbook", 150.50, "8th edition, 500 pages", "good", false, "textbook"),
("Sofa", 150.50, "10' width, gray", "new", false, "furniture"),
("Chair", 151.50, "small, gray", "new", false, "furniture"),
("Bike", 152.50, "Black, light", "new", false, "outdoor");  

-- create table service (
-- 	service_id int primary key auto_increment,
--     name varchar(100) not null,
--     description varchar(300),
--     price_per_hour decimal not null,
--     category varchar(100)
-- );
insert into service(name, description, price_per_hour, category) 
values ("moving furniture", "lift anything under 70 lbs", 50.00,"furnitue", "handyman"); 

-- create table user_info (
-- 	user_id int primary key auto_increment,
--     username varchar(50) not null,
--     email varchar(200) not null,
--     password_hash varchar(1024) not null,
--     image_url varchar(512) null
-- );
insert into user_info(username, email, password_hash)
values("johnnyappleseed", "johnnyappleseed@apple.com", "apple"); 
