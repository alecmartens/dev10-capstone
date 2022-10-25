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

    //A listing must have one (itemId, serviceId) greater than 0, and the other one = 0
    //Listing cannot be null
    //listingId, itemId, serviceId cannot be null
    //No duplicate userId, itemId, serviceId
    private ListingResult validate(Listing listing) {
        ListingResult result = new ListingResult();
        if (listing == null) {
            result.addErrorMessage("Listing cannot be null.", ResultType.INVALID);
            return result;
        }
        if (listing.getItemId() > 0 && listing.getServiceId() > 0) {
            result.addErrorMessage("itemId and serviceId cannot both be greater than 0", ResultType.INVALID);
        }
        else if (listing.getItemId() == 0 && listing.getServiceId() == 0) {
            result.addErrorMessage("itemId and serviceId cannot both be equal to 0", ResultType.INVALID);
        }
        else if ((listing.getItemId() < 0 || listing.getServiceId() < 0)) {
            result.addErrorMessage("itemId or serviceId cannot be less than 0", ResultType.INVALID);
        }
        if(result.isSuccess()) {
            List<Listing> listings = findAll();//get all listings
            System.out.println("Size:" + listings.size());
            for (Listing l: listings) {//check for duplicate combos
                //No duplicate userId, itemId, serviceId
                if (listing.getUserId() == l.getUserId() &&
                    listing.getItemId() == l.getItemId() &&
                    listing.getServiceId() == l.getServiceId()) {
                    System.out.println("found");
                    result.addErrorMessage("Cannot have a duplicate listing. (userId, itemId, serviceId must be unique)", ResultType.INVALID);
                }
            }
        }
        return result;
    }
}
