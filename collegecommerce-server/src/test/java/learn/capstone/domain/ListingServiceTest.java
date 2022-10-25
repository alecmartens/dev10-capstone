package learn.capstone.domain;

import learn.capstone.data.ItemRepository;
import learn.capstone.data.ListingRepository;
import learn.capstone.models.Item;
import learn.capstone.models.Listing;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

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

    }

    @Test //a listing cannot be both item and service
    void shouldNotCreateListingWith2PositiveIDs() {

    }

    @Test //a listing cannot be neither an item nor a service
    void shouldNotCreateListingWith2ZeroIDs() {

    }

    @Test //this case is when a listing is an item
    void shouldCreateListingWithPositiveItemIdZeroServiceID() {

    }

    @Test //this case is when a listing is a service
    void shouldCreateListingWithZeroItemIdPositiveServiceID() {

    }

    @Test
    void shouldNotUpdateListingWithZeroIds() {

    }

    @Test
    void shouldNotUpdateListingWithNegativeIds() {

    }

    @Test
    void shouldNotUpdateListingWithTwoPositiveIds() {

    }

    @Test
    void shouldUpdateListing() {

    }

    @Test
    void shouldNotDeleteMissing() {

    }

    @Test
    void shouldDelete() {
        
    }
}