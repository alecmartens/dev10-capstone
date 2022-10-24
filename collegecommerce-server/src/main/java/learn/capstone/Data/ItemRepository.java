package learn.capstone.Data;

import learn.capstone.models.Item;

import java.util.List;

public interface ItemRepository {
    List<Item> findAll();

    Item findByItemId(int itemId);

    Item create(Item item);

    boolean update(Item item);

    boolean deleteByItemId(int itemId);
    public void printItem(Item item);
}
