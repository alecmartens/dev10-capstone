package learn.capstone.data;

import learn.capstone.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserJdbcTemplateRepositoryTest {

    @Autowired
    UserJdbcTemplateRepository repository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setUp() {
        jdbcTemplate.update("call set_known_good_state();");
    }

    @Test
    void shouldFindByUsername() {
        User user = repository.findByUsername("JohnDoe");
        assertEquals("JohnDoe", user.getUsername());
        assertEquals("johndoe@gmail.com", user.getEmail());
        assertEquals(1, user.getUserId());
    }

    @Test
    void shouldCreate() {
        User user = makeUser();
        user = repository.create(user);
        assertNotNull(user);
        assertEquals(3, user.getUserId());
    }

    @Test
    void shouldUpdate() {
        User user = makeUser();
        user.setUserId(2);
        assertTrue(repository.update(user));
        user.setUserId(20);
        assertFalse(repository.update(user));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.delete(2));
        assertFalse(repository.delete(20));
    }

    private User makeUser() {
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        return new User(0, "TestUser", "testuser25@gmail.com", "testPassword", "imageurl", roles);
    }
}
