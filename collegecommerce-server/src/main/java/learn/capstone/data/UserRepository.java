package learn.capstone.data;

import learn.capstone.models.User;

public interface UserRepository {

    User findByUsername(String username);

    User create(User user);

    boolean update(User user);

    boolean delete(int userId);
}
