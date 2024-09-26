package com.LASU.project.Service;


import com.LASU.project.Entity.LoginRequest;
import com.LASU.project.Entity.LoginResponse;
import com.LASU.project.Entity.Profile;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Exception.ProfileException;

import java.io.IOException;

public interface ProfileService {

    void addUsers(Profile profile) throws ProfileException;

    LoginResponse login(LoginRequest request) throws ProfileException;


}
