set sql_safe_updates = 0; 
insert into item(name, price, description, item_condition, item_sold, category)
values ("desk", 150.50, "wooden desk, two drawers", "like new", false, "furniture"),
("Calculus Textbook", 150.50, "8th edition, 500 pages", "good", false, "textbook"),
("Sofa", 150.50, "10' width, gray", "new", false, "furniture"),
("Chair", 151.50, "small, gray", "new", false, "furniture"),
("Bike", 152.50, "Black, light", "new", false, "outdoor");  

insert into service(name, description, price_per_hour, category) 
values ("moving furniture", "lift anything under 70 lbs", 50.00,"furnitue"); 

insert into user_info(username, email, password_hash)
values("johnnyappleseed", "johnnyappleseed@apple.com", "apple"); 

