package learn.capstone.domain;

import learn.capstone.data.UserJdbcTemplateRepository;
import learn.capstone.models.User;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserJdbcTemplateRepository repository;
    private final PasswordEncoder encoder;

    public UserService(UserJdbcTemplateRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException(username + " not found.");
        }

        return user;
    }

    public Result<User> create(User user) {
        if (user == null) {
            Result<User> result = new Result<User>();
            result.addMessage("User cannot be null.", ResultType.INVALID);
            return result;
        }
        Result<User> result = validate(user.getUsername(), user.getPassword());

        if (!result.isSuccess()) {
            return result;
        }

        User newUser = new User(0, user.getUsername(), user.getEmail(), encoder.encode(user.getPassword()), user.getImageUrl(), List.of("USER"));

        try {
            user = repository.create(newUser);
            result.setPayload(user);
        } catch (DuplicateKeyException e) {
            result.addMessage("The provided username/email combination already exists.", ResultType.INVALID);
        }

        return result;
    }

    public Result<User> update(User user) {
        if (user == null) {
            Result<User> result = new Result<User>();
            result.addMessage("User cannot be null.", ResultType.INVALID);
            return result;
        }
        Result<User> result = validate(user.getUsername(), user.getPassword());

        if (!result.isSuccess()) {
            return result;
        }
        if (user.getUserId() <= 0) {
            result.addMessage("User ID cannot be equal or less than 0.", ResultType.INVALID);
            return result;
        }

        user.setPassword(encoder.encode(user.getPassword()));

        boolean updated = false;
        try {
            updated = repository.update(user);
        } catch (DuplicateKeyException e) {
            result.addMessage("The provided username/email combination already exists.", ResultType.INVALID);
        }
        if (updated) {
            result.setPayload(user);
        }
        return result;
    }

    public Result<User> delete(int userId) {
        Result<User> result = new Result<>();
        if (!repository.delete(userId)) {
            result.addMessage("User ID was not found", ResultType.INVALID);
        }
        return result;
    }

    private Result<User> validate(String username, String password) {
        Result<User> result = new Result<>();

        if (username == null || username.isBlank()) {
            result.addMessage("Username required.", ResultType.INVALID);
            return result;
        }
        if (password == null) {
            result.addMessage("Password required.", ResultType.INVALID);
            return result;
        }

        if (username.length() > 50) {
            result.addMessage("Username cannot be more than 50 characters", ResultType.INVALID);
        }

        if (!isValidPassword(password)) {
            result.addMessage("password must be at least 8 character and contain a digit," +
                            " a letter, and a non-digit/non-letter",
                            ResultType.INVALID);
        }
        return result;
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }
        return digits > 0 && letters > 0 && others > 0;
    }

}
