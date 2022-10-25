package learn.capstone.data;

import learn.capstone.models.Service;

import java.util.List;

public interface ServiceRepository {
    List<Service> findAll();
    Service findById(int id);
    boolean update(Service service);
    Service add(Service service);
    boolean delete(int serviceId);
}
