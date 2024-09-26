package com.LASU.project;

import com.LASU.project.Entity.Enum.AccountType;
import com.LASU.project.Entity.Profile;
import com.LASU.project.Repository.ProfileRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class ProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}

     @Bean
	 CommandLineRunner commandLineRunner(ProfileRepository profileRepository, PasswordEncoder passwordEncoder){
		return args -> {
			Profile admin = new Profile();

			admin.setFullName("ADMIN");
			admin.setEmail("admin@admin.com");
			admin.setAccountType(AccountType.ADMIN);
			admin.setPassword(passwordEncoder.encode("password"));

			Optional<Profile> response = profileRepository.findByEmail(admin.getEmail());

			if (response.isPresent()){
				return;
			}else {
				profileRepository.save(admin);
			}
		};
	}

}
