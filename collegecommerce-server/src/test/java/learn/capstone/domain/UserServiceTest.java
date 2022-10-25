package learn.capstone.domain;

import learn.capstone.data.UserJdbcTemplateRepository;
import learn.capstone.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DuplicateKeyException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserServiceTest {

    @Autowired
    UserService service;

    @MockBean
    UserJdbcTemplateRepository repository;

    @Test
    void shouldFindByUsername() {
        User expected = makeUser();
        when(repository.findByUsername("TestUser")).thenReturn(expected);
        User actual = (User) service.loadUserByUsername("TestUser");
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAdd() {
        User user = makeUser();
        user.setUsername("");
        Result<User> result = service.create(user);
        assertEquals(ResultType.INVALID, result.getType());

        user = makeUser();
        user.setPassword(null);
        result = service.create(user);
        assertEquals(ResultType.INVALID, result.getType());

        user.setPassword("Password123");
        result = service.create(user);
        assertEquals(ResultType.INVALID, result.getType());

        user = null;
        result = service.create(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddDuplicate() {
        User user = makeUser();

        when(repository.create(any())).thenThrow(DuplicateKeyException.class);

        Result<User> result = service.create(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldAdd() {
        User user = makeUser();

        when(repository.create(user)).thenReturn(user);
        Result<User> result = service.create(user);

        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdate() {
        User user = makeUser();
        Result<User> result = service.update(user);
        assertEquals(ResultType.INVALID, result.getType());

        user.setUserId(1);
        user.setUsername("");
        result = service.update(user);
        assertEquals(ResultType.INVALID, result.getType());

        user.setUsername("TestUser");
        user.setPassword(null);
        result = service.update(user);
        assertEquals(ResultType.INVALID, result.getType());

        user.setPassword("Password123");
        result = service.update(user);
        assertEquals(ResultType.INVALID, result.getType());

        user = null;
        result = service.update(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldUpdate() {
        User user = makeUser();
        user.setUserId(1);
        when(repository.update(user)).thenReturn(true);

        Result<User> result = service.update(user);

        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotDelete() {
        User user = makeUser();
        Result<User> result = service.delete(user.getUserId());
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldDelete() {
        User user = makeUser();
        user.setUserId(1);

        when(repository.delete(1)).thenReturn(true);

        Result<User> result = service.delete(user.getUserId());
        assertTrue(result.isSuccess());
    }

//    @Test
//    void encoderShouldWork() {
//        User user = makeUser();
//        user.setPassword("P@ssw0rd!");
//        when(repository.create(user)).thenReturn(user);
//
//        Result<User> result = service.create(user);
//        assertEquals("P@ssw0rd!", result.getPayload().getPassword());
//    }

    private User makeUser() {
        return new User(0, "TestUser", "testuser25@gmail.com", "testPassword#123", "imageurl", List.of("USER"));
    }

}
