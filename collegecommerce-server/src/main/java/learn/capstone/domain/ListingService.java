package learn.capstone.domain;

import learn.capstone.data.ListingRepository;
import learn.capstone.models.Listing;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListingService {
    private final ListingRepository repository;
    public ListingService(ListingRepository repository) {
        this.repository = repository;
    }

    public List<Listing> findAll() {
        return repository.findAll();
    }

    public Listing findByListingId(int listingId) {
        return repository.findByListingId(listingId);
    }

    public ListingResult create(Listing listing) {
        ListingResult result = validate(listing);
        if (listing != null && listing.getListingId() > 0) {//check that id is not set (autogenerate)
            result.addErrorMessage("Listing listing_id should not be set for create.", ResultType.INVALID);
        }
        if (result.isSuccess()) {
            listing = repository.create(listing);
            result.setListing(listing);
        }
        return result;
    }

    public ListingResult update(Listing listing) {
        ListingResult result = validate(listing);
        if (listing == null) {
            result.addErrorMessage("Listing cannot be null.", ResultType.INVALID);
        }
        else if (listing.getListingId() <= 0) {
            result.addErrorMessage("listing_id is required for update", ResultType.INVALID);
        }
        if (result.isSuccess()) {
            if (repository.update(listing)) {
                result.setListing(listing);
            }
            else {
                result.addErrorMessage("Listing listing_id %s not found.", ResultType.NOT_FOUND, listing.getListingId());
            }
        }
        return result;
    }
    public ListingResult deleteByListingId(int listingId) {
        ListingResult result = new ListingResult();
        if (!repository.deleteByListingId(listingId)) {
            result.addErrorMessage("Listing listing_id %s not found.", ResultType.NOT_FOUND, listingId);
        }
        return result;
    }

    //name and price cannot be null
    //there cannot be the same combination of name, price and description
    //price must be greater than 0
    //Add an upper bound for price?? (ex.$100,000)
    private ListingResult validate(Listing listing) {
        ListingResult result = new ListingResult();
        if (listing == null) {
            result.addErrorMessage("Listing cannot be null.", ResultType.INVALID);
            return result;
        }
        if (listing.getName() == null) {
            result.addErrorMessage("Listing name cannot be null.", ResultType.INVALID);
        }
        else if (listing.getName().equals("")) {
            result.addErrorMessage("Listing name cannot be blank.", ResultType.INVALID);
        }
        if (listing.getPrice() == null) {
            result.addErrorMessage("Price cannot be null", ResultType.INVALID);
        }
        else if (listing.getPrice().doubleValue() <= 0) {
            result.addErrorMessage("Price must be greater than 0.", ResultType.INVALID);
        }
        if(result.isSuccess()) {
            List<Listing> listings = findAll();//get all listings
            System.out.println("Size:" + listings.size());
            for (Listing i: listings) {//check for duplicate combos
                //System.out.println(i.getName());
                //System.out.println(listing.getName());
                //if(i.getListingId() != listing.getListingId() &&
                if (i.getName().equalsIgnoreCase(listing.getName())  &&
                        i.getDescription().equalsIgnoreCase(listing.getDescription())) {
                    //i.getPrice().equals(listing.getPrice()) &&

                    System.out.println("found");
                    result.addErrorMessage("Cannot have a duplicate listing. (name and description must be unique)", ResultType.INVALID);
                }
            }
        }

        return result;
    }
}
