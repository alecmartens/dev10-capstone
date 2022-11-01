package learn.capstone.controllers;

import learn.capstone.domain.Result;
import learn.capstone.domain.UserService;
import learn.capstone.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService service;
    public UserController(UserService service) {
        this.service = service;
    }
    @GetMapping("/{username}")
    public User findByUsername(@PathVariable String username) {
        return (User) service.loadUserByUsername(username);
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody User user) {
        Result<User> result = service.create(user);
        if (!result.isSuccess()) {
            return ErrorResponse.build(result);
        }
        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@AuthenticationPrincipal User authUser, @PathVariable int id, @RequestBody User user) {
        if (authUser.getUserId() != user.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if (id != user.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        // Reassign Password
        User oldUser = (User) service.loadUserByUsername(user.getUsername());
        user.setPassword(oldUser.getPassword());

        Result<User> result = service.update(user);
        if (!result.isSuccess()) {
            return ErrorResponse.build(result);
        }

        return new ResponseEntity<>(result.getPayload(), HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@AuthenticationPrincipal User authUser, @PathVariable int id) {
        if (authUser.getUserId() != id) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<User> result = service.delete(id);
        if (!result.isSuccess()) {
            return ErrorResponse.build(result);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
