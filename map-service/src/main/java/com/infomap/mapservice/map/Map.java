package com.infomap.mapservice.map;

import javax.persistence.*;

@Entity
@Table
public class Map {
    @Id
    @SequenceGenerator(
            name = "map_sequence",
            sequenceName = "map_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "map_sequence"
    )
    private Long id;
    private String name;

    public Map() { }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
