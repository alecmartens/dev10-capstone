use college_commerce;
set sql_safe_updates = 0; 

insert into item(name, price, description, item_condition, item_sold, category, user_id, is_available, location)
values ("desk", 150.50, "wooden desk, two drawers", "NEW", false, "FURNITURE", 1, true, "North Dakota State University"),
("Calculus Textbook", 150.50, "8th edition, 500 pages", "GOOD", false, "BOOKS", 1, true, "University of Minnesota"),
("Sofa", 150.50, "10' width, gray", "NEW", false, "FURNITURE", 1, false, "University of Minnesota"),
("Chair", 151.50, "small, gray", "USED", false, "FURNITURE", 2, true, "North Dakota State University"),
("Bike", 152.50, "Black, light", "POOR", false, "SPORTS", 2, false, "North Dakota State University");  

insert into service(name, description, price_per_hour, category, user_id, is_available, location)
    values ("delivering food", "pizza", 50.00,"DELIVERY",1,false, "North Dakota State University"),
    ("pet service", "any pet", 50.00,"REPAIR",1,true, "North Dakota State University"),
    ("setup fridge", "lift anything under 100 lbs", 50.00,"OTHER",2,true, "University of Minnesota");

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
