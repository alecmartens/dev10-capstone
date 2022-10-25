package learn.capstone.data;

import learn.capstone.models.Listing;

import java.util.List;

public interface ListingRepository {
    List<Listing> findAll();

    Listing findByListingId(int listingId);

    Listing create(Listing listing);

    boolean update(Listing listing);

    boolean deleteByListingId(int listingId);

    //This method takes a listing and prints it's contents to sout
    void printListing(Listing listing);
}
