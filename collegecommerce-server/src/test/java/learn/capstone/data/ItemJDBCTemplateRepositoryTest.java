package learn.capstone.data;

import learn.capstone.models.Item;
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
    private ItemJDBCTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

//    static boolean hasSetup = false;
//    @BeforeEach
//    void setup() {
//        if (!hasSetup) {
//            hasSetup = true;
//            jdbcTemplate.update("call set_known_good_state();");
//        }
//    }

    @Test
    void shouldFindAll() {
        List<Item> result = repository.findAll();
        assertNotNull(result);
        assertTrue(result.size() > 2);
        System.out.println(result.size());
        System.out.println(result.get(0).getName());

        //(name, price, description, item_condition, item_sold, category)
        //("desk", 150.50, "wooden desk, two drawers", "like new", false, "furniture"),
//        Item item = new Item(1, "desk", BigDecimal.valueOf(150.50), "wooden desk, two drawers",
//                "like new", false, "furniture", null);
//        assertTrue(result.contains(item));
    }

    @Test
    void shouldFindByItemId() {
        Item result = repository.findByItemId(1);
        assertNotNull(result);
        assertEquals(result.getName(), "desk");
    }

    @Test
    void shouldCreate() {
        Item item = new Item();
        item.setName("Test Name");
        item.setPrice(BigDecimal.valueOf(100));
        item.setDescription("Test Description");
        item.setItemCondition("Test Condition");
        item.setItemSold(false);
        item.setCategory("Test Category");
        item.setImageUrl("Test URL");

        Item result = repository.create(item);

        assertNotNull(result);
        assertEquals(6,result.getItemId());
        repository.printItem(result);
        repository.printItem(repository.findByItemId(6));
        assertEquals(result.getName(),repository.findByItemId(6).getName());
    }

    @Test
    void shouldUpdate() {
        //Run shouldCreate before this test
        //update the item created in the above test
        Item item = new Item();
        item.setItemId(6);
        item.setName("Update Name");
        item.setPrice(BigDecimal.valueOf(100));
        item.setDescription("Update Description");
        item.setItemCondition("Update Condition");
        item.setItemSold(false);
        item.setCategory("Update Category");
        item.setImageUrl("Update URL");

        assertTrue(repository.update(item));
//        assertEquals(item, repository.findByItemId(6));
        repository.printItem(item);
        repository.printItem(repository.findByItemId(6));
    }

    @Test
    void shouldDelete() {
        //Run shouldCreate before this test
        int before = repository.findAll().size();
        assertTrue(repository.deleteByItemId(6));
        int after = repository.findAll().size();
        assertEquals(1, before - after);//check that there is one less item in the list
    }
}