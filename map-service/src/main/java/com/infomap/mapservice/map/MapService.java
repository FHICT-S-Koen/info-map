package com.infomap.mapservice.map;

import com.infomap.mapservice.exception.NoSuchElementFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MapService {

    private final MapRepository mapRepository;

    public Map getUserMap(String userId) {
        return mapRepository.findMapByUserId(userId)
                .orElseThrow(() -> new NoSuchElementFoundException("Map not found"));
    }

    public Map createUserMap(Map map) {
        return mapRepository.save(map);
    }
}
