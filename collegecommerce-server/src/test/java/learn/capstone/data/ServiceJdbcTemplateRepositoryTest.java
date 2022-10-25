package learn.capstone.data;
import learn.capstone.models.*;
import learn.capstone.data.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
public class ServiceJdbcTemplateRepositoryTest {
    @Autowired
    ServiceJdbcTemplateRepository repo;
    @Autowired
    KnownGoodState knownGoodState;

//    @BeforeEach
//    void setup() {
//        knownGoodState.set();
//    }
    @Test
    void shouldFindAll(){
        List<Service> all = repo.findAll();
        assertTrue(all.size() > 0);
    }

    @Test
    void shouldUpdate(){
        Service service = new Service();
        service.setServiceId(25);
        service.setName("repair & deliver");
        service.setDescription("furniture delivery, repair");
        service.setPricePerHour(111.00);
        service.setCategory("furniture");
        assertTrue(repo.update(service));
    }

    @Test
    void shouldDelete(){
        int id = repo.findAll().get(0).getServiceId();
        assertTrue(repo.delete(id));
    }

    @Test
    void shouldAdd(){
        Service service = new Service();
        service.setName("repair & deliver new");
        service.setDescription("new furniture delivery, repair");
        service.setPricePerHour(111.00);
        service.setCategory("furniture");
        assertNotNull(repo.add(service));
    }
}
