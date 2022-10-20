# dev10-capstone
### Capstone Proposal - CollegeCommerce
### 1. Problem Statement

>  Most college students at some point will need to buy and sell various goods, items that could range from textbooks and school supplies to clothes to used furniture to fill their home. Given the financial state many students find themselves in, it may not be obvious or convenient to find these things at an affordable price. Our app is intended to directly connect students with others who want to sell their own items within the same local area.
>
> College students can also require many different services. Some may include help with moving, watching a pet during class, or tutoring help. Our app can connect them with people offering those services.
>
>  On the other hand, some college students or local residents may have items they do not want/need and wish to sell them. These could include similar items listed before such as used textbooks, clothes, or that extra couch they don’t want to move home. In addition, students/residents may have many specialties they can offer as a service. A college student looking to bring in some extra cash can offer to walk someone else’s dog, another could offer calculus tutoring, the list goes on. 
### 2. Technical Solution
Create an app where students can sell and buy items, and also provide and find services. The student is also able to narrow down on a location.
>
>	#### Scenario 1: 
>	Jane is graduating from college and has lots of extra furniture and items that she doesn’t want in her college dorm. She also needs some help to move out of her place. She uses the commerce/service app to ask new incoming freshmen if they would be interested in buying her used furniture and look up some services for moving out some of her items.
>
>	#### Scenario 2: 
>	Jane is studying for finals week and is too busy to run her daily errands. She goes onto the commerce/service app to get help with buying her food, doing her daily house chores, and taking care of her pet so that she can focus on her studies. 
### 3. Glossary
- Location: College campus or city/town
- Item: A physical item/good that has the ability to be listed for sale, sold, and bought
- Service: A service that has the ability to be listed for sale, sold, and bought
- Listing: Contains an item or service that can be bought/sold
- Anyone: A user of the app, can view listings
- User: Signed in user, can buy a listing or sell their own
- Has a username, email address, password, and optional location.
- Admin: Administrator, can do everything a User can do with special privileges.
### 4. High Level Requirement
- Create a listing (admin, user)
- Delete a listing (admin, user)
- View a listing (anyone)
- Create an item (admin, user)
- Edit an item(admin, user)
- Delete an item(admin, user)
- View an item (admin, user)
- Create a service(admin, user)
- Edit a service(admin, user)
- Delete a service(admin, user)
- View a service (admin, user)
- Create a user profile (anyone)
- View a user profile(anyone)
- Update a user profile(admin, user)
- Delete a user profile(admin, user)

### 5. User Stories / Scenarios
> #### Create an item:
> - Create an item that can be listed
> - Suggested data:Information about the item
> - Description, photo, price, date listed, location of item
> - Preconditions: User must be signed in 
> - Postcondition: Item is created and CAN be listed to be viewed and bought by others

> #### Create a service: 
> - List a service that authenticated users can view and buy
> - Suggested data: Information about service
> - Description, photo(?), price of service (Either a sum price OR price per hour), date listed, location of seller
> - Preconditions: User must be signed in 
> - Postcondition: Service is created and CAN be listed to be viewed and bought by others


> #### Edit an item: 
> - Edit an existing item listing
> - Suggested data: Description, photo(?), price of service (Either a sum price OR price per hour), date listed, location of seller
> - Precondition:
> - The price, photo, location can be changed
> - Date listed changes to the date of edit
> - Cannot change what service is being listed. If a user wants to list a new service instead, they can delete this service and create a new > - service listing.
> - User must be signed in to same account of original posting
> - Postcondition:
> - Updating an Item is listed and can be viewed and bought by others

> #### Edit a service: 
> - Edit an existing service listing
> - Suggested data:
> - Information about the service
> - Description, photo, price, date listed, location of item
> - Precondition:
> - The price, photo, location can be changed
> - Date listed changes to the date of edit
> - User must be signed in to same account of original posting
> - Postcondition:
> - Updating an Item is listed and can be viewed and bought by others

> #### Delete an item/service:
> - Delete an existing item/service listing
> - Precondition: 
> - Listing exists
> - User must be signed in to same account of original posting
> - Postcondition: Listing no longer exists


> #### Create a user profile:
> - Initial stats for sales, purchases, username, about, photo, location, date created
> - Precondition: Sign up with email
> - Postcondition: Profile can be viewed by others 

> #### View a user profile:
> - View seller reputation, rating, date started
> - Precondition: anyone can view non-personal details
> - Postcondition: None

> #### Update a user profile:
> - Allow user to edit non-stats data such as their email, password, description
> - Precondition:Logged in to account or is admin
> - Postcondition: Account gets updated

> #### Delete a user profile:
> - Have delete confirmation
> - Precondition:Logged in to account or is admin
> - Postcondition: Account deleted

> #### View an item/service listing:
> - Anyone can view an item or service listing.

> #### Create a listing (admin, user):
> - Allow seller to list an item/service and make is publicly visible
> - Precondition: Seller logged in
> - Item/service to be listed exists
> - Postcondition: Listing gets created

> #### Delete a listing (admin, user):
> - Allow seller to make listing private
> - Precondition: Seller logged in
> - Postcondition: Listing removed

### 6. MVP
- Features included:
- View/Create/Edit/Delete an item
- View/Create/Edit/Delete a service
- View/Create/Delete a listing
- View/Create a user profile


### [UI Prototype](https://www.figma.com/file/jkMfGu2t7Uf25KweyJCGqO/Dev10Capstone?node-id=0%3A1)

### Tech Stack 
- React 
- AWS cloud deployment 
