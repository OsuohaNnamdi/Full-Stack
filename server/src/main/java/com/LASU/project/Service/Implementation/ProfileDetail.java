package com.LASU.project.Service.Implementation;

import com.LASU.project.Exception.ProfileException;
import com.LASU.project.Repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ProfileDetail implements UserDetailsService
{

    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileDetail(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return profileRepository.findByEmail(username)
                .orElseThrow(()-> new ProfileException("Student With Username "+username+" Not Found"));
    }
}
