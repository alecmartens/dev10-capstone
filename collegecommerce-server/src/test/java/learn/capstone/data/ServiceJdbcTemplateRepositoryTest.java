package learn.capstone.data;
import learn.capstone.models.*;
import learn.capstone.data.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
public class ServiceJdbcTemplateRepositoryTest {
    @Autowired
    ServiceJdbcTemplateRepository repo;
    @Autowired
    private JdbcTemplate jdbcTemplate;

//    @Autowired
//    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        jdbcTemplate.update("call set_known_good_state();");
    }

    @Test
    void shouldFindAll(){
        List<Service> all = repo.findAll();
        assertTrue(all.size() > 0);
    }

    @Test
    void shouldUpdate(){
        Service service = makeService();
        service.setName("New Name");
        service.setServiceId(2);
        assertTrue(repo.update(service));
    }

    @Test
    void shouldDelete(){
        int id = repo.findAll().get(0).getServiceId();
        assertTrue(repo.delete(id));
    }

    @Test
    void shouldAdd(){
        Service service = makeService();

        Service result = repo.add(service);
        assertNotNull(result);
        assertEquals(result.getName(), service.getName());
    }

    private Service makeService() {
        Service service = new Service();
        service.setServiceId(0);
        service.setName("Test");
        service.setDescription("description");
        service.setPricePerHour(111.00);
        service.setCategory(ServiceCategory.DELIVERY);
        service.setUserId(1);
        service.setLocation("Location");
        return service;
    }
}
