package com.job.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BasicInfo {

    @NotBlank(message = "Full name is required")
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
    private String fullName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Mobile number must be a valid 10-digit Indian number"
    )
    private String mobile;

    @NotBlank(message = "Profile summary is required")
    @Size(min = 20, max = 500, message = "Profile summary must be between 20 and 500 characters")
    private String profileSummary;

    @NotEmpty(message = "At least one language is required")
    private List<
        @NotBlank(message = "Language cannot be empty")
        String
    > languages;

    @NotEmpty(message = "At least one skill is required")
    private List<
        @NotBlank(message = "Skill cannot be empty")
        String
    > skills;

    @NotEmpty(message = "Please select at least one interested domain")
    private List<
        @NotBlank(message = "Domain cannot be empty")
        String
    > interestedDomains;
}
 