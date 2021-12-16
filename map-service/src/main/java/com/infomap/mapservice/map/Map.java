package com.infomap.mapservice.map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Map {
    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @Column(length = 36, nullable = false, updatable = false)
    private String id;
//    private String name;
    @NotBlank
    @Column(nullable = false, unique = true)
    private String userId;

    public Map(String userId) {
        this.userId = userId;
    }
}
