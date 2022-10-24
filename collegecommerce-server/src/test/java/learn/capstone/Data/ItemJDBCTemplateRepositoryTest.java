package learn.capstone.Data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ItemJDBCTemplateRepositoryTest {
    @Autowired
    private ItemJDBCTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

//    static boolean hasSetup = false;
//    @BeforeEach
//    void setup() {
//        if (!hasSetup) {
//            hasSetup = true;
//            jdbcTemplate.update("call set_known_good_state();");
//        }
//    }

    @Test
    void shouldFindAll() {

    }

    @Test
    void shouldFindByItemId() {

    }

    @Test
    void shouldCreate() {

    }

    @Test
    void shouldUpdate() {

    }

    @Test
    void shouldDelete() {

    }
}