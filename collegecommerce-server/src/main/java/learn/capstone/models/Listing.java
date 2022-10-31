package learn.capstone.models;

//create table listing (
//	listing_id int primary key auto_increment,
//    is_available boolean,
//    user_id int not null,
//    item_id int,
//    service_id int,
public class Listing {
    int listingId;
    boolean isAvailable;
    int userId;
    int itemId;
    int serviceId;


    public Listing() {
    }

    public Listing(int listingId, boolean isAvailable, int userId, int itemId, int serviceId) {
        this.listingId = listingId;
        this.isAvailable = isAvailable;
        this.userId = userId;
        this.itemId = itemId;
        this.serviceId = serviceId;
    }

    public int getListingId() {
        return listingId;
    }

    public void setListingId(int listingId) {
        this.listingId = listingId;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }
}
