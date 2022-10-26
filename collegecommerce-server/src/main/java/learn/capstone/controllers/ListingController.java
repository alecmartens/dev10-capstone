package learn.capstone.controllers;

import learn.capstone.domain.ListingResult;
import learn.capstone.domain.ListingService;
import learn.capstone.domain.ResultType;
import learn.capstone.models.Listing;
import learn.capstone.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listing")
public class ListingController {
    private final ListingService service;
    private ResponseEntity<Object> objectResponseEntity;

    public ListingController(ListingService service) {
        this.service = service;
    }

    @GetMapping
    public List<Listing> findAll() {
        return service.findAll();
    }

    @GetMapping("/{listingId}")
    public Listing findByListingId(@PathVariable int listingId) {
        return service.findByListingId(listingId);
    }

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal User authUser, @RequestBody Listing listing) {
        if (authUser.getUserId() != listing.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        ListingResult result = service.create(listing);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); //400
        }
        return new ResponseEntity<>(result.getListing(), HttpStatus.CREATED);
    }

    @PutMapping("/{listingId}")
    public ResponseEntity<Object> update(@AuthenticationPrincipal User authUser, @PathVariable int listingId, @RequestBody Listing listing) {
        if (authUser.getUserId() != listing.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if (listingId != listing.getListingId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 409
        }

        ListingResult result = service.update(listing);
        if (!result.isSuccess()) {
            if (result.getResultType() == ResultType.NOT_FOUND) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
            } else {
                return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); //400
            }
        }
        return objectResponseEntity; //204
    }

    @DeleteMapping("/{listingId}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal User authUser, @PathVariable int listingId) {
        Listing listing = service.findByListingId(listingId);
        System.out.println(listing);
        if (listing == null) {
            System.out.println("Listing was null");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (listing.getUserId() != authUser.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        ListingResult result = service.deleteByListingId(listingId);
        if (result.getResultType() == ResultType.NOT_FOUND) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
    }
}