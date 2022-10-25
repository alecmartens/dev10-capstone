package learn.capstone.controllers;
import learn.capstone.domain.Result;
import learn.capstone.domain.ServiceService;
import learn.capstone.models.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service")
public class ServiceController {
    private final ServiceService service;
    public ServiceController(ServiceService serv){
        service = serv;
    }
    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Service serv){
        Result<Service> res = service.add(serv);
        if(res.isSuccess()){
            return new ResponseEntity<>(res.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(res);
    }

    @PutMapping("/{serviceId}")
    public ResponseEntity<Object> update(@PathVariable int serviceId, @RequestBody Service serv) {
        if (serviceId != serv.getServiceId() ) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Service> result = service.update(serv);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{serviceId}")
    public ResponseEntity<Void> deleteById(@PathVariable int serviceId) {
        if (service.delete(serviceId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public List<Service> findAll() {
        return service.findAll();
    }

    @GetMapping("/{serviceId}")
    public Service findById(@PathVariable int serviceId) {
        return service.findById(serviceId);
    }
}
