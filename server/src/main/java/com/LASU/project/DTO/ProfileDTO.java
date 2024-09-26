package com.LASU.project.DTO;


import com.LASU.project.Entity.Enum.AccountType;

public record ProfileDTO(

        String fullName,
        String email,
        String schoolId,
        AccountType accountType

) {
}
