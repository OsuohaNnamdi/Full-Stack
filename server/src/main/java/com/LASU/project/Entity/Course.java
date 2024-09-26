package com.LASU.project.Entity;

import com.LASU.project.Entity.Enum.Semester;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @SequenceGenerator(
            name = "course_sequence",
            sequenceName = "course_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "course_sequence")
    private Long id;

    @Column(nullable = false)
    private String courseTitle;

    @Column(nullable = false)
    private String courseCode;

    private String schoolId;

    @Enumerated(EnumType.STRING)
    private Semester semester;

    private String videoLink;

    private String file;

    private LocalDateTime createdDate;

    public Course() {
    }

    public Course(Long id, String courseTitle, String courseCode, String schoolId, Semester semester, String videoLink, String file, LocalDateTime createdDate) {
        this.id = id;
        this.courseTitle = courseTitle;
        this.courseCode = courseCode;
        this.schoolId = schoolId;
        this.semester = semester;
        this.videoLink = videoLink;
        this.file = file;
        this.createdDate = createdDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(String schoolId) {
        this.schoolId = schoolId;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}