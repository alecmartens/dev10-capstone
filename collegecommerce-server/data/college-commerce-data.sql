set sql_safe_updates = 0; 
insert into college_commerce.item(name, price, description, item_condition, item_sold, category, user_id, is_available)
values ("desk", 150.50, "wooden desk, two drawers", "like new", false, "furniture", 1, false),
("Calculus Textbook", 150.50, "8th edition, 500 pages", "good", false, "textbook", 2, true),
("Sofa", 150.50, "10' width, gray", "new", false, "furniture", 1, false),
("Chair", 151.50, "small, gray", "new", false, "furniture", 2, true),
("Bike", 152.50, "Black, light", "new", false, "outdoor", 3, true);  

insert into college_commerce.service(name, description, price_per_hour, category, user_id, is_available)
    values ("delivering food", "pizza", 50.00,"DELIVERY",1,false),
    ("pet service", "any pet", 50.00,"REPAIR",1,true),
    ("setup fridge", "lift anything under 100 lbs", 50.00,"OTHER",2,false);

insert into user_info(username, email, password_hash, image_url)
values ("JohnDoe", "johndoe@gmail.com",
        "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",
        "https://images.unsplash.com/photo-1629467057571-42d22d8f0cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
        ("JaneSmith", "janesmith24@gmail.com",
        "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",
        "");


-- insert into user_info(username, email, password_hash)
-- values("johnnyappleseed", "johnnyappleseed@apple.com", "apple"),
-- ("georgewashington","georgewashington@gmail.com","george"),
-- ("billyjoel","joelbilly@hotmail.com","bill"),
-- ("johnhancock","hancock@constitution.gov","john");

-- insert into listing(is_available, user_id, item_id, service_id)
-- values(true, 1, 1, 0),
-- (false,2,0,1),
-- (true,3,2,0);
