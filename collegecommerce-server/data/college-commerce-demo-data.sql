use college_commerce;
set sql_safe_updates = 0; 

insert into user_info (username, email, password_hash, image_url)
values
	("JohnDoe", "johndoe@gmail.com", 
	"$2a$10$l2kKeuOP4lT9fCo32vFkIek8hD/bOSX7PD4Sd1atZ8Kc5XV/1tCHW",
	"https://images.unsplash.com/photo-1629467057571-42d22d8f0cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),-- P@ssw0rd!
	("JaneSmith", "janesmith24@gmail.com", 
	"eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJidWctc2FmYXJpIiwic3ViIjoiYm9iQGpvbmVzLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjM4NzQ5NTU1fQ.mc6LUfd-80L2f5Do80-QlfYnwzn_JX3_CH3V31-yaEw",
	"https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"),
	("johnnyappleseed", "johnnyappleseed@apple.com", "$2a$10$4fyjor0z.PHLBuf..ItuJuX6tKv0QHqoomEHopyjyKz.HEBKBCqnm",
	"https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"),-- Password1!
	("GeorgeWashington","georgewashington@gmail.com","$2a$10$HDh0vfj6iA/mctCGVUxj9OrIn/qQyT1vMEYwc7JYpg1p6cj1kCoBS",
	"https://images.unsplash.com/photo-1585076800588-77e0884c3191?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VvcmdlJTIwd2FzaGluZ3RvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"),-- Password2!
	("SophieFisher","sophiefisher@gmail.com","$10$jJq3i3x0TQSPG.bC4zR.FeLWeJdbMvRx6aPVfCBMo/RV66kDGdwwm",
	"https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60");-- Password3!
        
insert into item(name, price, description, item_condition, item_sold, category, user_id, is_available, location, image_url)
values 
	("Desk", 150.50, "wooden desk, two drawers", "NEW", false, "FURNITURE", 2, true, "North Dakota State University","https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVza3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
	("Calculus Textbook", 150.50, "8th edition, 500 pages", "GOOD", false, "BOOKS", 1, true, "University of Minnesota","https://images.unsplash.com/photo-1614332625575-6bef549fcc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRleHRib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
	("Sofa", 150.50, "10' width", "NEW", false, "FURNITURE", 1, true, "University of Minnesota","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
	("Chair", 151.50, "small, gray", "USED", false, "FURNITURE", 2, true, "Duke University","https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhaXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"),
	("Bike", 152.50, "Black, light", "POOR", false, "SPORTS", 2, true, "Middle Tennessee State University","https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmlrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Painting", 12.50, "Small painting", "NEW", false, "ART", 1, true, "University of Minnesota","https://images.unsplash.com/photo-1579965342575-16428a7c8881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpbnRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"),
    ("Paintbrushes", 12.50, "Assorted brushes", "USED", false, "ART", 1, true, "University of Minnesota","https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpbnRicnVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("To Kill a Mockingbird", 10, "Classic book", "GOOD", false, "BOOKS", 2, true, "Middle Tennessee State University","https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Ethernet Cable", 12.50, "8ft cable", "GOOD", false, "ELECTRONICS", 5, true, "Duke University","https://images.unsplash.com/photo-1574405345169-f45c7d66480e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FibGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"),
    ("Men's Large T-Shirt", 8, "Graphic Tee", "POOR", false, "CLOTHING", 1, true, "University of Minnesota","https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hpcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"),
    ("Baseball Cap", 12, "Sports Team", "USED", false, "CLOTHING", 2, true, "University of Alabama at Tuscaloosa","https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFzZWJhbGwlMjBjYXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"),
    ("Local Honey", 15, "Tasty, from local farmers", "GOOD", false, "GROCERY", 1, true, "University of Minnesota","https://images.unsplash.com/photo-1536788567643-8c2368376526?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"),
    ("Dog Food", 12.50, "Nutritious dog food", "POOR", false, "PET", 5, true, "Middle Tennessee State University","https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("No. 2 Pencils", 5, "For school use", "GOOD", false, "SCHOOL", 1, true, "University of Minnesota","https://images.unsplash.com/photo-1596633608169-2ee5f4ed60e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVuY2lsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
    ("Baseball", 5, "Regulation baseball", "USED", false, "SPORTS", 2, true, "University of Alabama at Tuscaloosa","https://images.unsplash.com/photo-1582650448629-3c854f356544?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFzZWJhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"),
    ("Action Figure", 7.50, "Collectible action figure", "USED", false, "TOYS", 4, true, "University of Alabama at Tuscaloosa","https://images.unsplash.com/photo-1597422232698-1a27a1289cea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWN0aW9uJTIwZmlndXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
    ("Garden Hose", 15, "Outdoor use, 30 ft.", "NEW", false, "OTHER", 1, true, "University of Minnesota","https://images.unsplash.com/photo-1588501985886-2a38c5785e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG9zZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60");
    

insert into service(name, description, price_per_hour, category, user_id, is_available, location)
    values ("Delivering Food", "pizza", 50.00,"DELIVERY",1,false, "University of Minnesota"),
    ("Pet Service", "any pet", 50.00,"PET_CARE",3,true, "West Virginia University"),
    ("Setup fridge", "lift anything under 100 lbs", 50.00,"OTHER",2,true, "University of Minnesota"),
    ("Walk Dog", "Dog walking service", "10.00","PET_CARE",1,true,"University of Minnesota"),
    ("Clean kitchen", "Clean your whole kitchen!", "25.00","HOME_CLEANING",3,true,"West Virginia University"),
    ("Clean bathroom", "Clean all bathrooms in house", "50.00","HOME_CLEANING",1,true,"University of Minnesota"),
    ("Ride around campus", "Give you a ride to class, home, the library", "20.00","TRANSPORTATION",1,true,"University of Minnesota"),
    ("Rickshaw Ride", "Scenic ride towed by a bicycle", "50.00","TRANSPORTATION",3,true,"University of Texas at Arlington"),
    ("Buy school supplies", "I will buy you the school supplies you need", "100.00","SHOPPING",2,true,"University of Alabama at Tuscaloosa"),
    ("Go grocery shooping", "Give me a list of grocieries, I will buy them for you", "50.00","SHOPPING",1,true,"University of Minnesota");

