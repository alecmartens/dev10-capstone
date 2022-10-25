package learn.capstone.models;

import java.math.BigDecimal;

//item_id int primary key auto_increment,
//    name varchar(100) not null,
//    price decimal(8,2) not null,
//    description varchar(300),
//    item_condition varchar(50),
//    item_sold boolean,
//    category varchar(100),
//    image_url varchar(512) null,
//    constraint uq unique (name ,price , description)
public class Item {
    private int itemId;
    private String name;
    private BigDecimal price;
    private String description;
    private String itemCondition;
    private boolean itemSold;
    private String category; //Enum???
    private String imageUrl;

    public Item(int itemId, String name, BigDecimal price, String description, String itemCondition, boolean itemSold, String category, String imageUrl) {
        this.itemId = itemId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.itemCondition = itemCondition;
        this.itemSold = itemSold;
        this.category = category;
        this.imageUrl = imageUrl;
    }

    public Item() {
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getItemCondition() {
        return itemCondition;
    }

    public void setItemCondition(String itemCondition) {
        this.itemCondition = itemCondition;
    }

    public boolean isItemSold() {
        return itemSold;
    }

    public void setItemSold(boolean itemSold) {
        this.itemSold = itemSold;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
