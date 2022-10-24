package learn.capstone.domain;

import learn.capstone.data.ServiceJdbcTemplateRepository;
import learn.capstone.models.Service;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
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
        Service service = new Service();
        service.setName("repair & deliver new2");
        service.setDescription("new furniture delivery, repair2");
        service.setPricePerHour(111.00);
        service.setCategory("furniture2");
        Service mock = service;
        mock.setServiceId(100);
        when(serviceRepo.add(service)).thenReturn(mock);
        assertTrue(serviceService.add(service).isSuccess());

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
        Service service = new Service();
        service.setName("repair & deliver new2");
        service.setDescription("new furniture delivery, repair2");
        service.setPricePerHour(111.00);
        service.setCategory("furniture2");
        Service mock = service;
        mock.setServiceId(1);
        when(serviceRepo.delete(1)).thenReturn(true);
        when(serviceRepo.findById(1)).thenReturn(mock);
        assertTrue(serviceService.delete(1));
    }
    @Test
    void shouldNotDelete(){
        when(serviceRepo.findById(1)).thenReturn(null);
        assertFalse(serviceService.delete(1));
    }

    @Test
    void shouldUpdate(){
        Service service = new Service();
        service.setName("repair & deliver new2");
        service.setDescription("new furniture delivery, repair2");
        service.setPricePerHour(111.00);
        service.setCategory("furniture2");
        Service mock = service;
        mock.setServiceId(1);
        when(serviceRepo.findById(1)).thenReturn(mock);
        when(serviceRepo.update(mock)).thenReturn(true);
        assertTrue(serviceService.update(mock).isSuccess());
    }
    @Test
    void shouldNotUpdate(){
        Service service = new Service();
        assertFalse(serviceService.update(service).isSuccess());
        service.setServiceId(1);
        assertFalse(serviceService.update(service).isSuccess());
    }
}
