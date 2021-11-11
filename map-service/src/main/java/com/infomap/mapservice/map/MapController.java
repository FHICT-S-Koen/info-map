package com.infomap.mapservice.map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/")
public class MapController {

    private final MapService mapService;

    @Autowired
    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("public")
    public String getTest() {
        return "Test!";
    }

    @PostMapping
    public void createMap(@RequestBody Map map) {
        mapService.createMap(map);
    }
}
