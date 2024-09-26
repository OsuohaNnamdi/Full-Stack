package com.LASU.project.DTO.DTO_Mapper;


import com.LASU.project.DTO.ProfileDTO;
import com.LASU.project.Entity.Profile;
import org.springframework.stereotype.Component;

import java.util.function.Function;


@Component
public class ProfileMapper implements Function
        <Profile, ProfileDTO> {


    @Override
    public ProfileDTO apply(Profile profile) {
        return new ProfileDTO(
                profile.getFullName(),
                profile.getEmail(),
                profile.getSchoolId(),
                profile.getAccountType()
        );
    }
}
