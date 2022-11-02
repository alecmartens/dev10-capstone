package learn.capstone.data;

import learn.capstone.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
@Repository
public class ItemJDBCTemplateRepository implements ItemRepository {
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
        item.setUserId(resultSet.getInt("user_id"));
        item.setAvailable(resultSet.getBoolean("is_available"));
        item.setLocation(resultSet.getString("location"));

        return item;
    };

    @Override
    public List<Item> findAll() {
        final String sql = "select item_id, name, price, description, item_condition, item_sold, category, image_url, user_id, is_available, location " +
                "from item ";

        return jdbcTemplate.query(sql, mapper);
    }

    @Override
    public Item findByItemId(int itemId) {
        final String sql = "select item_id, name, price, description, item_condition, item_sold, category, image_url, user_id, is_available, location " +
                "from item " +
                "where item_id = ?";

        return jdbcTemplate.query(sql, mapper, itemId).stream().findFirst().orElse(null);
    }

    @Override
    public Item create(Item item) {
        final String sql = "insert into item " +
                "(name, price, description, item_condition, item_sold, category, image_url, user_id, is_available, location) " +
                "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, item.getName());
            statement.setBigDecimal(2, item.getPrice());
                    statement.setString(3,item.getDescription());
                    statement.setString(4,item.getItemCondition());
                    statement.setBoolean(5,item.isItemSold());
                    statement.setString(6,item.getCategory());
                    statement.setString(7, item.getImageUrl());
                    statement.setInt(8, item.getUserId());
                    statement.setBoolean(9, item.isAvailable());
                    statement.setString(10, item.getLocation());

            return statement;
        }, keyHolder);

        if (rowsAffected == 0) {
            return null;
        }

        item.setItemId(keyHolder.getKey().intValue());

        return item;
    }

    @Override
    public boolean update(Item item) {
        final String sql = "update item set " +
                "name = ?, " +
                "price = ?, " +
                "description = ?, " +
                "item_condition = ?, " +
                "item_sold = ?, " +
                "category = ?, " +
                "image_url = ?, " +
                "user_id = ?, " +
                "is_available = ? " +
                "location = ? " +
                "where item_id = ?;";

        int rowsUpdated = jdbcTemplate.update(sql,
                item.getName(),
                item.getPrice(),
                item.getDescription(),
                item.getItemCondition(),
                item.isItemSold(),
                item.getCategory(),
                item.getImageUrl(),
                item.getUserId(),
                item.isAvailable(),
                item.getItemId());

        System.out.println(rowsUpdated);
        return rowsUpdated > 0;
    }

    @Override
    public boolean deleteByItemId(int itemId) {
        final String sql = "delete from item where item_id = ?;";
        return jdbcTemplate.update(sql,itemId) > 0;
    }

    //This method takes an item and prints it's contents to sout
    @Override
    public void printItem(Item item) {
        String result =
                "itemId: " + item.getItemId() +
                        " name: " + item.getName() +
                        " price: " + item.getPrice() +
                        " description: " + item.getDescription() +
                        " itemCondition: " + item.getItemCondition() +
                        " itemSold: " + item.isItemSold() +
                        " category: " + item.getCategory() +
                        " imageUrl: " + item.getImageUrl() +
                        " userId: " + item.getUserId() +
                        " isAvailable " + item.isAvailable() +
                        " location: " + item.getLocation();
        System.out.println(result);
    }
}
