package com.infomap.mapservice.map;

import com.infomap.mapservice.exception.NoSuchElementFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MapServiceTest {

    @Mock
    private MapRepository mapRepository;
    private MapService mapService;

    @BeforeEach
    void setUp() {
        mapService = new MapService(mapRepository);
    }

    @Test
    void shouldGetUserMap() {
        // given
        var userId = "test";
        var expectedMap =
                Optional.of(new Map("id", userId));

        doReturn(expectedMap).when(mapRepository)
                .findMapByUserId(userId);

        // when
        var actualMap = mapService.getUserMap(userId);

        // then
        assertThat(actualMap).isEqualTo(expectedMap.get());
    }

    @Test
    void shouldThrowErrorWhenMapNotFound() {
        // given
        var userId = "test";
        var expectedError =
                new NoSuchElementFoundException("Map not found!");

        doThrow(expectedError).when(mapRepository)
                .findMapByUserId(userId);

        // when
        // then
        assertThatThrownBy(() -> mapService.getUserMap(userId))
                .isInstanceOf(expectedError.getClass())
                .hasMessageContaining(expectedError.getMessage());
    }

    @Test
    void createUserMap() {
        // given
        var map = new Map("id", "test");

        // when
        mapService.createUserMap(map);

        // then
        ArgumentCaptor<Map> mapArgumentCaptor =
                ArgumentCaptor.forClass(Map.class);

        verify(mapRepository)
                .save(mapArgumentCaptor.capture());

        var capturedMap = mapArgumentCaptor.getValue();

        assertThat(capturedMap).isEqualTo(map);
    }

//    @Test
//    void shouldThrowErrorWhenUserIdEmptyOrNull() {
//        // given
//        var expectedError =
//                new IllegalArgumentException("UserId cannot be empty");
//
//        // when
//        // then
//        assertThatThrownBy(() -> mapService.createUserMap(new Map()))
//                .isInstanceOf(IllegalArgumentException.class)
//                .hasMessageContaining(expectedError.getMessage());
//
//        assertThatThrownBy(() -> mapService.createUserMap(new Map("")))
//                .isInstanceOf(IllegalArgumentException.class)
//                .hasMessageContaining(expectedError.getMessage());
//    }
}