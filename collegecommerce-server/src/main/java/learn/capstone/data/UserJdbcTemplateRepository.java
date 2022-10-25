package learn.capstone.data;

import learn.capstone.data.Mappers.UserMapper;
import learn.capstone.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;
import java.util.List;

@Repository
public class UserJdbcTemplateRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Transactional
    public User findByUsername(String username) {
        List<String> roles = getRolesByUserName(username);

        final String sql = "select user_id, username, email, password_hash, image_url " +
                "from user_info " +
                "where username = ?;";

        return jdbcTemplate.query(sql, new UserMapper(roles), username)
                .stream()
                .findFirst().orElse(null);
    }

    @Transactional
    public User create(User user) {

        final String sql = "insert into user_info (username, email, password_hash, image_url)" +
                "values (?, ?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());
            ps.setString(4, user.getImageUrl());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());

        updateRoles(user);

        return user;
    }

    @Transactional
    public boolean update(User user) {
        final String sql = "update user_info set "
                + "username = ?, "
                + "email = ?, "
                + "password_hash = ?, "
                + "image_url = ? "
                + "where user_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql, user.getUsername(), user.getEmail(), user.getPassword(), user.getImageUrl(), user.getUserId());

        if (rowsAffected > 0) {
            updateRoles(user);
        }

        return rowsAffected > 0;
    }

    @Transactional
    public boolean delete(int userId) {
        jdbcTemplate.update("delete from app_user_role where user_id = ?", userId);
        int rowsAffected = jdbcTemplate.update("delete from user_info where user_id = ?;", userId);
        return rowsAffected > 0;
    }

    private void updateRoles(User user) {
        jdbcTemplate.update("delete from app_user_role where user_id = ?;", user.getUserId());

        Collection<GrantedAuthority> authorities = user.getAuthorities();

        if (authorities == null) {
            return;
        }

        for (GrantedAuthority role : authorities) {
            String sql = "insert into app_user_role (user_id, app_role_id) "
                    + "select ?, app_role_id from app_role where `name` = ?;";
            jdbcTemplate.update(sql, user.getUserId(), role.getAuthority());
        }
    }

    private List<String> getRolesByUserName(String username) {
        final String sql = "select r.name "
                + "from app_user_role ur "
                + "inner join app_role r on ur.app_role_id = r.app_role_id "
                + "inner join user_info u on ur.user_id = u.user_id "
                + "where u.username = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), username);
    }
}
