package learn.capstone.data;

import learn.capstone.models.Item;
import learn.capstone.models.ItemCategory;
import learn.capstone.models.ItemCondition;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ItemJDBCTemplateRepositoryTest {
    @Autowired
    ItemJDBCTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setUp() {
        jdbcTemplate.update("call set_known_good_state();");
    }

    @Test
    void shouldFindAll() {
        List<Item> result = repository.findAll();
        assertNotNull(result);
        System.out.println(result.size());
        System.out.println(result.get(0).getName());
        assertTrue(result.size() > 1);
    }

    @Test
    void shouldFindByItemId() {
        Item result = repository.findByItemId(1);
        assertNotNull(result);
        assertEquals(result.getName(), "desk");
    }

    @Test
    void shouldCreate() {
        Item item = makeItem();
        Item result = repository.create(item);

        assertNotNull(result);
        assertEquals(6,result.getItemId());
        assertEquals(result.getName(),repository.findByItemId(6).getName());
    }

    @Test
    void shouldUpdate() {
        Item item = makeItem();
        item.setItemId(3);
        item.setName("New Name");

        assertTrue(repository.update(item));
        assertEquals("New Name", repository.findByItemId(3).getName());
    }

    @Test
    void shouldDelete() {
        int before = repository.findAll().size();
        assertTrue(repository.deleteByItemId(3));
        int after = repository.findAll().size();
        assertEquals(1, before - after);
    }

    private Item makeItem() {
        Item item = new Item(0, "Test", BigDecimal.valueOf(100), "Description", ItemCondition.GOOD,
                false, ItemCategory.BOOKS, "", 1, true, "Location");
        return item;
    }
}