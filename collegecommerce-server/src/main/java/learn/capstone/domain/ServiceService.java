package learn.capstone.domain;

import learn.capstone.data.ServiceJdbcTemplateRepository;
import org.springframework.stereotype.Service;
import learn.capstone.models.*;

import java.util.List;

@Service
public class ServiceService {
    private final ServiceJdbcTemplateRepository serviceRepo;

    public ServiceService(ServiceJdbcTemplateRepository serviceRepo) {
        this.serviceRepo = serviceRepo;
    }
    //    create table service (
//        service_id int primary key auto_increment,
//        name varchar(100) not null,
//        description varchar(300),
//        price_per_hour decimal(8,2) not null,
//        category varchar(100),
//        constraint uq unique (name, description, price_per_hour)
//        );
    public Result<learn.capstone.models.Service> add(learn.capstone.models.Service service){
        Result<learn.capstone.models.Service> res = new Result<>();
        if(service == null){
            res.addMessage("service can't be null", ResultType.INVALID);
            return res;
        }
        else if (service.getName() == null || service.getName().isBlank()){
            res.addMessage("name required", ResultType.INVALID);
            return res;
        }
        else if(service.getPricePerHour() <= 0.0){
            res.addMessage("price per hour must be greater than 0", ResultType.INVALID);
            return res;
        }
        if(hasDuplicate(service)){
            res.addMessage("name and description already exists.", ResultType.INVALID);
            return res;
        }
        res.setPayload(serviceRepo.add(service));
        res.addMessage("success", ResultType.SUCCESS);
        return res;
    }
    private boolean hasDuplicate(learn.capstone.models.Service service){
        List<learn.capstone.models.Service> all = serviceRepo.findAll();
        for(learn.capstone.models.Service s: all){
            if(s.getName().equals(service.getName()) &&
                    s.getDescription().equals(service.getDescription()) &&
                    service.getServiceId() <= 0 && s.getServiceId() != service.getServiceId()){
                return true;
            }
        }
        return false;
    }
    public Result<learn.capstone.models.Service> update(learn.capstone.models.Service service){
        Result<learn.capstone.models.Service> res = new Result<>();
        if(service == null){
            res.addMessage("service can't be null", ResultType.INVALID);
            return res;
        }
        else if(service.getServiceId() <= 0 || serviceRepo.findById(service.getServiceId()) == null){
            res.addMessage("service id doesn't exist", ResultType.NOT_FOUND);
            return res;
        }
        else if (service.getName() == null || service.getName().isBlank()){
            res.addMessage("name required", ResultType.INVALID);
            return res;
        }
        else if(service.getPricePerHour() <= 0.0){
            res.addMessage("price per hour must be greater than 0", ResultType.INVALID);
            return res;
        }
        if(hasDuplicate(service)){
            res.addMessage("name and description already exists.", ResultType.INVALID);
            return res;
        }
        boolean updated = serviceRepo.update(service);
        if(updated){
            res.setPayload(service);
            return res;
        }
        else{
            res.addMessage("error", ResultType.INVALID);
            return res;
        }
    }
    public boolean delete(int id){
        if(serviceRepo.findById(id) == null){
            return false;
        }
        boolean deleted = serviceRepo.delete(id);
        return deleted;
    }

    public List<learn.capstone.models.Service> findAll(){
        return serviceRepo.findAll();
    }

    public learn.capstone.models.Service findById(int id){
        return serviceRepo.findById(id);
    }

}
