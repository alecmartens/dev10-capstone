package learn.capstone.data;

import learn.capstone.models.Listing;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

//create table listing (
//	listing_id int primary key auto_increment,
//    is_available boolean,
//    user_id int not null,
//    item_id int,
//    service_id int,
@Repository
public class ListingJDBCTemplateRepository implements ListingRepository {
    private final JdbcTemplate jdbcTemplate;
    public ListingJDBCTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Listing> mapper = (resultSet, rowIndex) -> {
        Listing listing = new Listing();

        listing.setListingId(resultSet.getInt("listing_id"));
        listing.setAvailable(resultSet.getBoolean("is_available"));
        listing.setUserId(resultSet.getInt("user_id"));
        listing.setItemId(resultSet.getInt("item_id"));
        listing.setServiceId(resultSet.getInt("service_id"));

        return listing;
    };

    @Override
    public List<Listing> findAll() {
        final String sql = "select listing_id, is_available, user_id, item_id, service_id " +
                "from listing ";

        return jdbcTemplate.query(sql, mapper);
    }

    @Override
    public Listing findByListingId(int listingId) {
        final String sql = "select listing_id, is_available, user_id, item_id, service_id " +
                "from listing " +
                "where listing_id = ?";

        return jdbcTemplate.query(sql, mapper, listingId).stream().findFirst().orElse(null);
    }

    @Override
    public Listing create(Listing listing) {
        final String sql = "insert into listing " +
                "(is_available, user_id, item_id, service_id) " +
                "values (?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setBoolean(1, listing.isAvailable());
            statement.setInt(2, listing.getUserId());
            statement.setInt(3,listing.getItemId());
            statement.setInt(4,listing.getServiceId());

            return statement;
        }, keyHolder);

        if (rowsAffected == 0) {
            return null;
        }

        listing.setListingId(keyHolder.getKey().intValue());

        return listing;
    }

    @Override
    public boolean update(Listing listing) {
        final String sql = "update listing set " +
                "is_available = ?, " +
                "user_id = ?, " +
                "item_id = ?, " +
                "service_id = ? " +
                "where listing_id = ?;";

        int rowsUpdated = jdbcTemplate.update(sql,
                listing.isAvailable(),
                listing.getUserId(),
                listing.getItemId(),
                listing.getServiceId(),
                listing.getListingId());
        System.out.println("Rows updated: " + rowsUpdated);
        return rowsUpdated > 0;
    }

    @Override
    public boolean deleteByListingId(int listingId) {
        final String sql = "delete from listing where listing_id = ?;";
        return jdbcTemplate.update(sql,listingId) > 0;
    }

    //This method takes a listing and prints it's contents to sout
    @Override
    public void printListing(Listing listing) {
        String result =
                "listingId: " + listing.getListingId() +
                        " isAvailable: " + listing.isAvailable() +
                        " userId: " + listing.getUserId() +
                        " itemId: " + listing.getItemId() +
                        " serviceID: " + listing.getServiceId();
        System.out.println(result);
    }
}