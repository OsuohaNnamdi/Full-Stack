package com.LASU.project.Service;

import com.LASU.project.Entity.Course;
import com.LASU.project.Exception.GeneralException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CourseService {

    Course findById(Long id) throws GeneralException;

    void updateCourse(Long id, Course course) throws GeneralException, IOException;

    void saveCourse(Course course, MultipartFile document) throws GeneralException, IOException;

    void deleteById (Long id) throws GeneralException;

    List<Course> findAllCourse() throws GeneralException;

    List<Course> findByCourse(String id) throws GeneralException;

    List<Course> findBySchoolId(String id) throws GeneralException;
}
