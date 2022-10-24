package learn.capstone.Data;

import learn.capstone.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
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
        final String sql = "select item_id, name, price, description, item_condition, item_sold, category, image_url " +
                "from college_commerce.item ";

        return jdbcTemplate.query(sql, mapper);
    }

    public Item findByItemId(int itemId) {
        final String sql = "select item_id, name, price, description, item_condition, item_sold, category, image_url " +
                "from college_commerce.item " +
                "where item_id = ?";

        return jdbcTemplate.query(sql, mapper, itemId).stream().findFirst().orElse(null);
    }

    public Item create(Item item) {
        final String sql = "insert into college_commerce " +
                "(name, price, description, item_condition, item_sold, category, image_url) " +
                "values (?, ?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, item.getName());
            statement.setBigDecimal(2, item.getPrice());
                    statement.setString(3,item.getDescription())
                    statement.setString(4,item.getItemCondition())
                    statement.setBoolean(5,item.isItemSold());
                    statement.setString(6,item.getCategory());
                    statement.setString(7, item.getImageUrl());

            return statement;
        }, keyHolder);

        if (rowsAffected == 0) {
            return null;
        }

        item.setItemId(keyHolder.getKey().intValue());

        return item;
    }

    public boolean update(Item item) {
        final String sql = "update college_commerce set " +
                "name = ?, " +
                "price = ?, " +
                "description = ?, " +
                "item_condition = ?, " +
                "item_sold = ?, " +
                "category = ?, " +
                "image_url = ?, " +
                "where item_id = ?;";

        int rowsUpdated = jdbcTemplate.update(sql,
                item.getName(),
                item.getPrice(),
                item.getDescription(),
                item.getItemCondition(),
                item.isItemSold(),
                item.getCategory(),
                item.getImageUrl(),
                item.getItemId());

        return rowsUpdated > 0;
    }

    public boolean deleteByItemId(int itemId) {
        final String sql = "delete from college_commerce where item_id = ?;";
        return jdbcTemplate.update(sql,itemId) > 0;
    }
}
