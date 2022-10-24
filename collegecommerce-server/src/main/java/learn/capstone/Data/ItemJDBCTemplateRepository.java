package learn.capstone.Data;

import learn.capstone.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

//    item_id int primary key auto_increment,
//    name varchar(100) not null,
//    price decimal(8,2) not null,
//    description varchar(300),
//    item_condition varchar(50),
//    item_sold boolean,
//    category varchar(100),
//    image_url varchar(512) null,
//    constraint uq unique (name ,price , description)

@Repository
public class ItemJDBCTemplateRepository {
    private final JdbcTemplate jdbcTemplate;
    public ItemJDBCTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Item> mapper = (resultSet, rowIndex) -> {
        Item item = new Item();

        item.setItemId(resultSet.getInt("item_id"));
        item.setName(resultSet.getString("name"));
        item.setPrice(resultSet.getBigDecimal("price"));
        item.setDescription(resultSet.getString("description"));
        item.setItemCondition(resultSet.getString("item_condition"));
        item.setItemSold(resultSet.getBoolean("item_sold"));
        item.setCategory(resultSet.getString("category"));
        item.setImageUrl(resultSet.getString("image_url"));

        return item;
    };

    public List<Item> findAll() {

    }

    public Item findByItemId(int itemId) {

    }

    public Item create(Item item) {

    }

    public boolean update(Item item) {

    }

    public boolean deleteByItemId(int itemId) {
        
    }
}
