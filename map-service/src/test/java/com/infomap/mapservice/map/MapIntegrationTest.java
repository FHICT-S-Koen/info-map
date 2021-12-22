package com.infomap.mapservice.map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class MapIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Sql("/user-map.sql")
    void shouldGetUserMap() throws Exception {
        mockMvc.perform(get("/api/v1/map/{userId}", "test"))
                .andExpect(status().isOk());
    }

    @Test
    void userMapShouldNotBeFoundAfterGet() throws Exception {
        mockMvc.perform(get("/api/v1/map/{userId}", "test"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldCreateUserMap() throws Exception {
        mockMvc.perform(post("/api/v1/map/")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userId\": \"test\"}"))
                .andExpect(status().isCreated());
    }
}