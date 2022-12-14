package learn.capstone.data;

import learn.capstone.models.Service;
import learn.capstone.models.ServiceCategory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ServiceJdbcTemplateRepository implements ServiceRepository{
    private final JdbcTemplate jdbcTemplate;
    private RowMapper<Service> serviceMapper = (rs, rowNum) ->{
        Service service = new Service();
        service.setServiceId(rs.getInt("service_id"));
        service.setName(rs.getString("name"));
        service.setDescription(rs.getString("description"));
        service.setPricePerHour(rs.getDouble("price_per_hour"));
        ServiceCategory category = ServiceCategory.valueOf(rs.getString("category"));
        service.setCategory(category);
        service.setUserId(rs.getInt("user_id"));
        service.setAvailable(rs.getBoolean("is_available"));
        service.setLocation(rs.getString("location"));
        return service;
    };

    public ServiceJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Service> findAll() {
        final String sql = "select service_id,name,description,price_per_hour,category,user_id,is_available,location from service;";
        List<Service> all = jdbcTemplate.query(sql, serviceMapper);
        return all;
    }

    @Override
    public Service findById(int id) {
        String sql =  "select service_id,name,description,price_per_hour,category,user_id, is_available,location from service " +
                "where service_id=?;";
        Service service = jdbcTemplate.query(sql, serviceMapper,id).stream()
                .findFirst()
                .orElse(null);
        return service;
    }

    @Transactional
    @Override
    public Service add(Service service){
        final String sql ="insert into service(name, description, price_per_hour, category, user_id, is_available, location) " +
                "values (?,?,?,?,?,?,?);";
       KeyHolder keyholder= new GeneratedKeyHolder();
                int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, service.getName());
            ps.setString(2, service.getDescription());
            ps.setDouble(3, service.getPricePerHour());
            ps.setString(4, service.getCategory().getName());
            ps.setInt(5, service.getUserId());
            ps.setBoolean(6,service.isAvailable());
            ps.setString(7, service.getLocation());
            return ps;
        }, keyholder);
        if (rowsAffected <= 0) {
            return null;
        }
        service.setServiceId(keyholder.getKey().intValue());
        return service;
    }

    @Transactional
    @Override
    public boolean update(Service service) {
        final String sql = "update service set name= ?, description = ?, price_per_hour = ?, category = ?, user_id = ?, is_available = ?, location = ? " +
                "where service_id = ?;";
        return jdbcTemplate.update(sql, service.getName(), service.getDescription(), service.getPricePerHour(), service.getCategory().getName(), service.getUserId(), service.isAvailable(), service.getLocation(),service.getServiceId()) > 0;
    }

    @Transactional
    @Override
    public boolean delete(int serviceId) {
        final String sql = "delete from service where service_id = ?;";
        return jdbcTemplate.update(sql,serviceId) > 0;
    }
}

