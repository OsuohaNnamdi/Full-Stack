package com.LASU.project.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pastQuestion")
public class Past_Question {

    @Id
    @SequenceGenerator(
            name = "pastQuestion_sequence",
            sequenceName = "pastQuestion_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "pastQuestion_sequence")
    private Long id;

    @Column(nullable = false)
    private String courseTitle;

    @Column(nullable = false)
    private String courseCode;

    private String schoolId;

    private String file;

    public Past_Question()     {
    }

    public Past_Question(Long id, String courseTitle, String courseCode, String lecturerId, String file) {
        this.id = id;
        this.courseTitle = courseTitle;
        this.courseCode = courseCode;
        this.schoolId = lecturerId;
        this.file = file;
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

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }
}
