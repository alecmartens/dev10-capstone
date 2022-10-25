package learn.capstone.domain;

import learn.capstone.data.ItemRepository;
import learn.capstone.data.ListingRepository;
import learn.capstone.models.Item;
import learn.capstone.models.Listing;
import learn.capstone.models.Service;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ListingServiceTest {
    @Autowired
    ListingService service;

    @MockBean
    ListingRepository repository;

    @Test
    void shouldFindAll() {
        assertNotNull(repository.findAll());
        System.out.println(repository.findAll().size());
    }

    @Test
    void shouldNotCreateNullListing() {
        Listing listing = null;
        ListingResult result = service.create(listing);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotCreateListingWithNegativeIDs() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(1);
        listing.setItemId(-1);
        listing.setServiceId(-1);
        ListingResult result = service.create(listing);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test //a listing cannot be both item and service
    void shouldNotCreateListingWith2PositiveIDs() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(1);
        listing.setItemId(1);
        listing.setServiceId(1);
        ListingResult result = service.create(listing);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test //a listing cannot be neither an item nor a service
    void shouldNotCreateListingWith2ZeroIDs() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(1);
        listing.setItemId(0);
        listing.setServiceId(0);
        ListingResult result = service.create(listing);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotCreateListingWithNegativeUserId() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(-1);
        listing.setItemId(1);
        listing.setServiceId(0);
        ListingResult result = service.create(listing);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test //this case is when a listing is an item
    void shouldCreateListingWithPositiveItemIdZeroServiceID() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(1);
        listing.setItemId(1);
        listing.setServiceId(0);
        ListingResult result = service.create(listing);
        assertTrue(result.isSuccess());
    }

    @Test //this case is when a listing is a service
    void shouldCreateListingWithZeroItemIdPositiveServiceID() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(1);
        listing.setItemId(0);
        listing.setServiceId(1);
        ListingResult result = service.create(listing);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdateListingWithZeroIds() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(1);
        listing.setItemId(0);
        listing.setServiceId(0);
        ListingResult result = service.update(listing);
        assertFalse(result.isSuccess());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotUpdateListingWithNegativeIds() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(1);
        listing.setItemId(-1);
        listing.setServiceId(-1);
        ListingResult result = service.update(listing);
        assertFalse(result.isSuccess());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotUpdateListingWithTwoPositiveIds() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(1);
        listing.setItemId(1);
        listing.setServiceId(1);
        ListingResult result = service.update(listing);
        assertFalse(result.isSuccess());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldUpdateListing() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(1);
        listing.setItemId(1);
        listing.setServiceId(0);

        Listing mock = listing;
        mock.setListingId(1);
        when(repository.findByListingId(1)).thenReturn(mock);
        when(repository.update(mock)).thenReturn(true);

        ListingResult result = service.update(mock);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotDeleteMissing() {
        ListingResult result = service.deleteByListingId(999);
        assertFalse(result.isSuccess());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldDelete() {
        Listing listing = new Listing();
        listing.setAvailable(true);
        listing.setUserId(1);
        listing.setItemId(1);
        listing.setServiceId(0);
        Listing mock = listing;
        mock.setServiceId(1);

        when(repository.deleteByListingId(1)).thenReturn(true);
        when(repository.findByListingId(1)).thenReturn(mock);
        ListingResult result = service.deleteByListingId(1);
        assertTrue(result.isSuccess());
    }
}