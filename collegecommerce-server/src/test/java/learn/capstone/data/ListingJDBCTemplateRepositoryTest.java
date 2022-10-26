package learn.capstone.data;

import learn.capstone.models.Listing;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest//(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class ListingJDBCTemplateRepositoryTest {
    @Autowired
    ListingJDBCTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

//    @Autowired
//    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        jdbcTemplate.update("call set_known_good_state();");
    }

    @Test
    void shouldFindAll() {
        List<Listing> result = repository.findAll();
        assertNotNull(result);
        System.out.println(result.size());
        repository.printListing(result.get(0));
        assertTrue(result.size() > 2);
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
        listing.setListingId(2);
        listing.setAvailable(true);
        listing.setUserId(4);
        listing.setItemId(2);
        listing.setServiceId(0);

        assertTrue(repository.update(listing));
        repository.update(listing);
        repository.printListing(listing);
        repository.printListing(repository.findByListingId(2));
    }

    @Test
    void shouldDelete() {
        //Run shouldCreate before this test
        int before = repository.findAll().size();
        assertTrue(repository.deleteByListingId(1));
        int after = repository.findAll().size();
        assertEquals(1, before - after);//check that there is one less listing in the list
    }
}