package com.job.dtos;

import java.util.List;
import lombok.Data;

@Data
public class AppliedCandidateDto {

    private String id;
    private String fullName;
    private String email;
    private String mobile;

    private List<String> skills;
    private String resume;
    private String imgUrl;
    private String profileSummary;
}
