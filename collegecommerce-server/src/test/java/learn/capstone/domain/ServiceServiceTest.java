package learn.capstone.domain;

import learn.capstone.data.ServiceJdbcTemplateRepository;
import learn.capstone.models.Service;
import learn.capstone.models.ServiceCategory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ServiceServiceTest {
    @Autowired
    ServiceService serviceService;

    @MockBean
    ServiceJdbcTemplateRepository serviceRepo;

    @Test
    void shouldFind(){
        List<Service> mock = new ArrayList<>();
        when(serviceRepo.findAll()).thenReturn(mock);
        assertEquals(serviceService.findAll(), mock);
    }
    @Test
    void shouldAdd(){
        Service mock = makeService();
        when(serviceRepo.add(mock)).thenReturn(mock);
        Result<Service> result = serviceService.add(mock);

        assertNotNull(result);
        assertTrue(result.isSuccess());
    }
    @Test
    void shouldNotAdd(){
        Service service = null;
        assertFalse(serviceService.add(service).isSuccess());
        service = new Service();
        service.setName("pet service");
        assertFalse(serviceService.add(service).isSuccess());
    }

    @Test
    void shouldDelete(){
        Service service = makeService();
        service.setServiceId(1);
        when(serviceRepo.delete(1)).thenReturn(true);
        when(serviceRepo.findById(1)).thenReturn(service);
        assertTrue(serviceService.delete(1));
    }
    @Test
    void shouldNotDelete(){
        when(serviceRepo.findById(20)).thenReturn(null);
        assertFalse(serviceService.delete(20));
    }

    @Test
    void shouldUpdate(){
        Service service = makeService();
        service.setServiceId(1);
        when(serviceRepo.findById(1)).thenReturn(service);
        when(serviceRepo.update(service)).thenReturn(true);
        Result<Service> result = serviceService.update(service);

        assertNotNull(result);
        assertTrue(result.isSuccess());
    }
    @Test
    void shouldNotUpdate(){
        Service service = new Service();
        assertFalse(serviceService.update(service).isSuccess());
        service.setServiceId(1);
        assertFalse(serviceService.update(service).isSuccess());
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
