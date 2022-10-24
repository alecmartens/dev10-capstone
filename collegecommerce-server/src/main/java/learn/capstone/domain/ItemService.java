package learn.capstone.domain;

import learn.capstone.Data.ItemRepository;
import learn.capstone.models.Item;

import java.math.BigDecimal;
import java.util.List;

public class ItemService {
    private final ItemRepository repository;
    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public List<Item> findAll() {
        return repository.findAll();
    }

    public Item findByItemId(int itemId) {
        return repository.findByItemId(itemId);
    }

    public ItemResult create(Item item) {
        ItemResult result = validate(item);
        if (item != null && item.getItemId() > 0) {//check that id is not set (autogenerate)
            result.addErrorMessage("Item item_id should not be set for create.", ResultType.INVALID);
        }
        if (result.isSuccess()) {
            item = repository.create(item);
            result.setItem(item);
        }
        return result;
    }

    public ItemResult update(Item item) {
        ItemResult result = validate(item);
        if (item.getItemId() <= 0) {
            result.addErrorMessage("item_id is required for update", ResultType.INVALID);
        }
        if (result.isSuccess()) {
            if (repository.update(item)) {
                result.setItem(item);
            }
            else {
                result.addErrorMessage("Item item_id %s not found.", ResultType.NOT_FOUND, item.getItemId());
            }
        }
        return result;
    }
    public ItemResult deleteByItemId(int itemId) {
        ItemResult result = new ItemResult();
        if (!repository.deleteByItemId(itemId)) {
            result.addErrorMessage("Item item_id %s not found.", ResultType.NOT_FOUND, itemId);
        }
        return result;
    }

    //name and price cannot be null
    //there cannot be the same combination of name, price and description
    //price must be greater than 0
    //Add an upper bound for price?? (ex.$100,000)
    private ItemResult validate(Item item) {
        ItemResult result = new ItemResult();
        if (item == null) {
            result.addErrorMessage("Item cannot be null.", ResultType.INVALID);
            return result;
        }
        if (item.getName().equals("") || item.getName().equals(null)) {
            result.addErrorMessage("Item name cannot be blank or null.", ResultType.INVALID);
        }
        if ((item.getPrice().doubleValue() <= 0) || item.getPrice() == null) {
            result.addErrorMessage("Price must be greater than 0.", ResultType.INVALID);
        }
        if(result.isSuccess()) {
            List<Item> items = repository.findAll();//get all items
            for (Item i: items) {//check for duplicate combos
                if(i.getItemId() != item.getItemId() &&
                    i.getName().equalsIgnoreCase(item.getName()) &&
                    i.getPrice().equals(item.getPrice()) &&
                    i.getDescription().equalsIgnoreCase(item.getDescription())) {
                    result.addErrorMessage("Cannot have a duplicate item. (name, price and description must be unique)", ResultType.INVALID);
                }
            }
        }

        return result;
    }
}
