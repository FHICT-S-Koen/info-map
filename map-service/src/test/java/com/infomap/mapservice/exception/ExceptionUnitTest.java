package com.infomap.mapservice.exception;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ExceptionUnitTest {

    @Test
    void shouldContainExpectedValidationError() {
        // given
        var response = new ErrorResponse(
                422, "Validation error. Check 'errors' field for details."
        );
        var expectedField = "userId";
        var expectedMessage = "must not be blank";

        //when
        response.addValidationError("userId", "must not be blank");

        //then
        assertThat(response.getErrors().get(0).getField()).isEqualTo(expectedField);
        assertThat(response.getErrors().get(0).getMessage()).isEqualTo(expectedMessage);
    }

    @Test
    void should() {
        // given

    }
}
