package com.infomap.mapservice.map;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/map")
public class MapController {

    private final MapService mapService;

    @GetMapping("{userId}")
    public Map getUserMap(@PathVariable String userId) {
        return mapService.getUserMap(userId);
    }

    @PostMapping
    public Map createUserMap(@Valid @RequestBody Map map) {
        return mapService.createUserMap(map);
    }
}
