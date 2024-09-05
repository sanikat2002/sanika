package com.example.inventorymanagement;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
    private List<Item> inventory = new ArrayList<>();

    @GetMapping
    public List<Item> getAllItems() {
        return inventory;
    }

    @PostMapping
    public String addItem(@RequestBody Item item) {
        inventory.add(item);
        return "Item added";
    }

    @PutMapping("/{index}")
    public String updateItem(@PathVariable int index, @RequestBody Item item) {
        inventory.set(index, item);
        return "Item updated";
    }

    @DeleteMapping("/{index}")
    public String deleteItem(@PathVariable int index) {
        inventory.remove(index);
        return "Item deleted";
    }

    @GetMapping("/total")
    public double getTotalValue() {
        return inventory.stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
    }
}
