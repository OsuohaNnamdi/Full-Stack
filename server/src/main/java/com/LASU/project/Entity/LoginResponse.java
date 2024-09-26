package com.LASU.project.Entity;


import com.LASU.project.DTO.ProfileDTO;

public record LoginResponse(
        ProfileDTO profileDTO,
        String token

) {
}
