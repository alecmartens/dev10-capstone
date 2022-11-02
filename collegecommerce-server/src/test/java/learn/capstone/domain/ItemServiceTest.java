package learn.capstone.domain;

import learn.capstone.data.ItemRepository;
import learn.capstone.models.Item;
import learn.capstone.models.ItemCategory;
import learn.capstone.models.ItemCondition;
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
        Item item = makeItem();
        item.setPrice(null);

        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotCreateItemWithNegativePrice() {
        Item item = makeItem();
        item.setPrice(BigDecimal.valueOf(-100));

        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotCreateItemWithNullName() {
        Item item = makeItem();
        item.setName(null);

        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotCreateItemWithEmptyName() {
        Item item = makeItem();
        item.setName("");

        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        //assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldCreate() {
        Item item = makeItem();
        when(repository.create(item)).thenReturn(item);

        ItemResult result = service.create(item);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdateItemWithNegativePrice() {
        Item item = makeItem();
        item.setPrice(BigDecimal.valueOf(-100));

        ItemResult result = service.update(item);
        assertFalse(result.isSuccess());
        System.out.println(result.getErrorMessages().get(0));
    }

    @Test
    void shouldNotUpdateItemWithEmptyName() {
        Item item = makeItem();
        item.setName("");

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
        Item item = makeItem();
        item.setItemId(3);

        when(repository.findByItemId(3)).thenReturn(item);
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
        Item item = makeItem();

        when(repository.deleteByItemId(0)).thenReturn(true);
        when(repository.findByItemId(0)).thenReturn(item);

        ItemResult result = service.deleteByItemId(0);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotCreateDuplicateItem() {
        Item item = makeItem();

        when(repository.findAll()).thenReturn(List.of(item));

        ItemResult result = service.create(item);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getErrorMessages().size());
        System.out.println(result.getErrorMessages().get(0));
    }

    private Item makeItem() {
        Item item = new Item(0, "Test", BigDecimal.valueOf(100), "Description", ItemCondition.GOOD,
                false, ItemCategory.BOOKS, "", 1, true, "Location");
        return item;
    }
}