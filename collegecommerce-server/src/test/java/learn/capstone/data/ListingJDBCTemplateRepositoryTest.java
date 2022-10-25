package learn.capstone.data;

import learn.capstone.models.Listing;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class ListingJDBCTemplateRepositoryTest {
    @Autowired
    ListingJDBCTemplateRepository repository;
    @Autowired
    KnownGoodState knownGoodState;

    @Test
    void shouldFindAll() {
        List<Listing> result = repository.findAll();
        assertNotNull(result);
        assertTrue(result.size() > 2);
        System.out.println(result.size());
        System.out.println(result.get(0).getListingId());
    }

    @Test
    void shouldFindByListingId() {
        Listing result = repository.findByListingId(1);
        assertNotNull(result);
        assertEquals(result.getListingId(), 1);
    }

    @Test
    void shouldCreate() {
        Listing listing = new Listing();
        listing.setAvailable(false);
        listing.setUserId(4);
        listing.setItemId(1);
        listing.setServiceId(0);

        Listing result = repository.create(listing);

        assertNotNull(result);
        assertEquals(4,result.getListingId());
        repository.printListing(result);
        repository.printListing(repository.findByListingId(4));
        assertEquals(result.getListingId(),repository.findByListingId(4).getListingId());
    }

    @Test
    void shouldUpdate() {
        //Run shouldCreate before this test
        //update the listing created in the above test
        Listing listing = new Listing();
        listing.setListingId(4);
        listing.setAvailable(true);
        listing.setUserId(4);
        listing.setItemId(2);
        listing.setServiceId(0);

        assertTrue(repository.update(listing));
        repository.update(listing);
        repository.printListing(listing);
        repository.printListing(repository.findByListingId(4));
    }

    @Test
    void shouldDelete() {
        //Run shouldCreate before this test
        int before = repository.findAll().size();
        assertTrue(repository.deleteByListingId(4));
        int after = repository.findAll().size();
        assertEquals(1, before - after);//check that there is one less listing in the list
    }
}