package com.LASU.project.Service.Implementation;

import com.LASU.project.Entity.Course;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.CourseRepository;
import com.LASU.project.Service.CourseService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class CourseImplementation implements CourseService {

    private final CourseRepository courseRepository;
    private final CloudinaryService cloudinaryService;

    public CourseImplementation(CourseRepository applicationRepository, CloudinaryService cloudinaryService) {
        this.courseRepository = applicationRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public void saveCourse(Course course, MultipartFile document) throws GeneralException, IOException {

        String response = cloudinaryService.uploadImage(document);
        course.setFile(response);

        courseRepository.save(course);

    }

    @Override
    public void deleteById(Long id) throws GeneralException {

        courseRepository.deleteById(id);
    }

    @Override
    public List<Course> findAllCourse() throws GeneralException {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> findByCourse(String id) throws GeneralException {
        try {
            return courseRepository.findByCourse(id);
        }catch (GeneralException e){
            throw new GeneralException("Course Not Found"+ e);
        }
    }

    @Override
    public List<Course> findBySchoolId(String id) throws GeneralException {
        try {
            return courseRepository.findBySchoolId(id);
        }catch (GeneralException e){
            throw new GeneralException("Course Not Found with this Id "+ id+ e);
        }
    }

    @Override
    public Course findById(Long id) throws GeneralException {
        return courseRepository.findById(id)
                .orElseThrow(()-> new GeneralException("Course Not Found"));
    }

    @Override
    public void updateCourse(Long id, Course request) throws GeneralException, IOException {


        try {

            Course course = courseRepository.findById(id).orElseThrow(()-> new GeneralException("Cousre with Id "+id+" Not Found"));
            if (course != null){
                if (request.getCourseTitle() != null){
                    course.setCourseTitle(request.getCourseTitle());
                }
                if (request.getCourseCode() != null){
                    course.setCourseCode(request.getCourseCode());
                }
                if (request.getSemester() != null){
                    course.setSemester(request.getSemester());
                }
                if (request.getVideoLink() != null){
                    course.setVideoLink(request.getVideoLink());
                }

                courseRepository.save(course);
            }

        }catch (GeneralException e){
            throw new GeneralException("Update Failed Due to "+e);
        }



    }




}

