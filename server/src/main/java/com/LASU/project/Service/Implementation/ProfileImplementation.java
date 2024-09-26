package com.LASU.project.Service.Implementation;

import com.LASU.project.Configuration.JWT.JWT;
import com.LASU.project.DTO.DTO_Mapper.ProfileMapper;
import com.LASU.project.DTO.ProfileDTO;
import com.LASU.project.Entity.LoginRequest;
import com.LASU.project.Entity.LoginResponse;
import com.LASU.project.Entity.Profile;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Exception.ProfileException;
import com.LASU.project.Repository.ProfileRepository;
import com.LASU.project.Service.ProfileService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ProfileImplementation implements ProfileService
{

    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;
    private  final JWT jwt;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public ProfileImplementation(ProfileRepository profileRepository, ProfileMapper profileMapper, JWT jwt, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.profileRepository = profileRepository;
        this.profileMapper = profileMapper;
        this.jwt = jwt;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void addUsers(Profile request) throws ProfileException {



        Optional<Profile> response = profileRepository.findByEmail(request.getEmail());

        if (response.isPresent()){
            throw new ProfileException("Student Exist");
        }
        else {
            Profile profile = new Profile();

            profile.setFullName(request.getFullName());
            profile.setSchoolId(request.getSchoolId());
            profile.setPassword(passwordEncoder.encode(request.getPassword()));
            profile.setAccountType(request.getAccountType());
            profile.setEmail(request.getEmail());

            profileRepository.save(profile);
        }
    }



    @Override
    public LoginResponse login(LoginRequest request) throws ProfileException {
        try{
            Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(
                    request.email(),
                    request.password()
            ));
            Profile principal = (Profile) authentication.getPrincipal();

            ProfileDTO profileDTO = profileMapper.apply(principal);

            String token = jwt.issuedToken(profileDTO.email(), "Student");

            return new LoginResponse(profileDTO , token);
        }catch (AuthenticationException e) {

            return null;
        }
    }

    public List<ProfileDTO> searchProfiles(String query) {

        return profileRepository
                .findByEmailContainingIgnoreCase(query)
                .stream()
                .map(profileMapper)
                .collect(Collectors.toList());
    }

    public ProfileDTO getProfileByEmail(String email) {
        ProfileDTO profile = profileRepository.findByEmail(email)
                .map(profileMapper)
                .orElseThrow(() -> new ProfileException("Email not Found"));
        if (profile == null) {
            throw new ProfileException("Profile not found for email: " + email);
        }
        return profile;
    }

    public List<ProfileDTO> listAllProfiles() {
        return profileRepository
                .findAll()
                .stream()
                .map(profileMapper)
                .collect(Collectors.toList());
    }

    public void updateProfile(Long id, Profile request) {
    }

    public void deleteById(Long id) {
        profileRepository.deleteById(id);
    }
}
