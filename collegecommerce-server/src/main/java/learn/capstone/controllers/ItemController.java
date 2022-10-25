package learn.capstone.controllers;

import learn.capstone.domain.ItemResult;
import learn.capstone.domain.ItemService;
import learn.capstone.domain.ResultType;
import learn.capstone.models.Item;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ItemController {
    private final ItemService service;
    private ResponseEntity<Object> objectResponseEntity;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<Item> findAll() {
        return service.findAll();
    }

    @GetMapping("/{itemId}")
    public Item findByItemId(@PathVariable int itemId) {
        return service.findByItemId(itemId);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Item item) {
        System.out.println(item.getName());
        ItemResult result = service.create(item);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); //400
        }
        return new ResponseEntity<>(result.getItem(), HttpStatus.CREATED);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Object> update(@PathVariable int itemId, @RequestBody Item item) {
        System.out.println(itemId);
        System.out.println(item.getItemId());
        if (itemId != item.getItemId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 409
        }

        ItemResult result = service.update(item);
        if (!result.isSuccess()) {
            if (result.getResultType() == ResultType.NOT_FOUND) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
            } else {
                return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); //400
            }
        }
        return objectResponseEntity; //204
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> delete(@PathVariable int itemId) {
        ItemResult result = service.deleteByItemId(itemId);
        if (result.getResultType() == ResultType.NOT_FOUND) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
    }
}
