package com.LASU.project.Entity;


import com.LASU.project.Entity.Enum.AccountType;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "profile")
public class Profile implements UserDetails
 {
    @Id
    @SequenceGenerator(
            name = "profile_sequence",
            sequenceName = "profile_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "profile_sequence")
    private Long id;
    private String fullName;
    private String email;
    private String schoolId;
    private String password;
    @Enumerated(EnumType.STRING)
    private AccountType accountType;



    public Profile() {
    }

     public Profile(Long id, String fullName, String email, String schoolId, String password, AccountType accountType) {
         this.id = id;
         this.fullName = fullName;
         this.email = email;
         this.schoolId = schoolId;
         this.password = password;
         this.accountType = accountType;
     }

     public String getFullName() {
         return fullName;
     }

     public void setFullName(String fullName) {
         this.fullName = fullName;
     }

     public String getEmail() {
         return email;
     }

     public void setEmail(String email) {
         this.email = email;
     }

     public String getSchoolId() {
         return schoolId;
     }

     public void setSchoolId(String schoolId) {
         this.schoolId = schoolId;
     }

     public void setPassword(String password) {
         this.password = password;
     }

     public AccountType getAccountType() {
         return accountType;
     }

     public void setAccountType(AccountType accountType) {
         this.accountType = accountType;
     }

     @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return  List.of( new SimpleGrantedAuthority("Student"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
