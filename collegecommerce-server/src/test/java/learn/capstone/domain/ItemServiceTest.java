package learn.capstone.domain;

import learn.capstone.data.ItemRepository;
import learn.capstone.models.Item;
import learn.capstone.models.Listing;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class ItemServiceTest {
    @Autowired
    ItemService service;

    @MockBean
    ItemRepository repository;

    @Test
    void shouldFindAll() {
        assertNotNull(repository.findAll());
        System.out.println(repository.findAll().size());
    }

    @Test
    void shouldNotCreateNullItem() {
        Item item = null;
        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotCreateItemWithNullPrice() {
        Item item = new Item();
        item.setName("Test Name");
        item.setPrice(null);
        item.setDescription("Test Description");
        item.setItemCondition("Test Condition");
        item.setItemSold(false);
        item.setCategory("Test Category");
        item.setImageUrl("Test URL");

        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotCreateItemWithNegativePrice() {
        Item item = new Item();
        item.setName("Test Name");
        item.setPrice(BigDecimal.valueOf(-100));
        item.setDescription("Test Description");
        item.setItemCondition("Test Condition");
        item.setItemSold(false);
        item.setCategory("Test Category");
        item.setImageUrl("Test URL");

        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotCreateItemWithNullName() {
        Item item = new Item();
        item.setName(null);
        item.setPrice(BigDecimal.valueOf(100));
        item.setDescription("Test Description");
        item.setItemCondition("Test Condition");
        item.setItemSold(false);
        item.setCategory("Test Category");
        item.setImageUrl("Test URL");

        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotCreateItemWithEmptyName() {
        Item item = new Item();
        item.setName("");
        item.setPrice(BigDecimal.valueOf(100));
        item.setDescription("Test Description");
        item.setItemCondition("Test Condition");
        item.setItemSold(false);
        item.setCategory("Test Category");
        item.setImageUrl("Test URL");

        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        //assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldCreate() {
        Item item = new Item();
        item.setName("TestName");
        item.setPrice(BigDecimal.valueOf(10));
        item.setDescription("TestDescription");
        item.setItemCondition("TestCondition");
        item.setItemSold(true);
        item.setCategory("TestCategory");
        item.setImageUrl("TestURL");

        ItemResult result = service.create(item);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdateItemWithNegativePrice() {
        Item item = new Item();
        item.setName("Test Name");
        item.setPrice(BigDecimal.valueOf(-100));
        item.setDescription("Test Description");
        item.setItemCondition("Test Condition");
        item.setItemSold(false);
        item.setCategory("Test Category");
        item.setImageUrl("Test URL");

        ItemResult result = service.update(item);
        assertFalse(result.isSuccess());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotUpdateItemWithEmptyName() {
        Item item = new Item();
        item.setName("");
        item.setPrice(BigDecimal.valueOf(100));
        item.setDescription("Test Description");
        item.setItemCondition("Test Condition");
        item.setItemSold(false);
        item.setCategory("Test Category");
        item.setImageUrl("Test URL");

        ItemResult result = service.update(item);
        assertFalse(result.isSuccess());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotUpdateNullPanel() {
        Item item = null;

        ItemResult result = service.update(item);
        assertFalse(result.isSuccess());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldUpdate() {
        Item item = new Item(1,"name",BigDecimal.valueOf(10),"description",
                "condition",true,"category","url");

        when(repository.findByItemId(1)).thenReturn(item);
        when(repository.update(item)).thenReturn(true);
        ItemResult result = service.update(item);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotDeleteMissingItem() {
        ItemResult result = service.deleteByItemId(999);
        assertFalse(result.isSuccess());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldDelete() {
        Item item = new Item(1,"name",BigDecimal.valueOf(10),"description",
                "condition",true,"category","url");

        when(repository.deleteByItemId(1)).thenReturn(true);
        when(repository.findByItemId(1)).thenReturn(item);

        ItemResult result = service.deleteByItemId(1);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotCreateDuplicateItem() {
        Item item = new Item();
        item.setName("desk");
        item.setPrice(BigDecimal.valueOf(150.50));
        item.setDescription("wooden desk, two drawers");
        item.setItemCondition("like new");
        item.setItemSold(false);
        item.setCategory("furniture");
        item.setImageUrl(null);

        when(repository.findAll()).thenReturn(List.of(item));

        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }
}