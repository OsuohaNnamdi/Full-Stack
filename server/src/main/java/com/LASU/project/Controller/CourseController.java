package com.LASU.project.Controller;

import com.LASU.project.Entity.Course;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> saveCourse(
            @ModelAttribute Course course,
            @RequestPart("document") MultipartFile document) {
        try {
            courseService.saveCourse(course, document);
            return new ResponseEntity<>("Course saved successfully", HttpStatus.CREATED);
        } catch (GeneralException | IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        try {
            List<Course> courses = courseService.findAllCourse();
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch (GeneralException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        try {
            Course course = courseService.findById(id);
            return new ResponseEntity<>(course, HttpStatus.OK);
        } catch (GeneralException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id,
                                               @RequestBody Course request) {
        try {
            courseService.updateCourse(id, request);
            return new ResponseEntity<>("Course updated successfully", HttpStatus.OK);
        } catch (GeneralException | IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        try {
            courseService.deleteById(id);
            return new ResponseEntity<>("Course deleted successfully", HttpStatus.NO_CONTENT);
        } catch (GeneralException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<List<Course>> searchCoursesById(@PathVariable String id) {
        try {
            List<Course> courses = courseService.findByCourse(id);
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch (GeneralException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/school/{id}")
    public ResponseEntity<List<Course>> searchCoursesBySchoolId(@PathVariable String id) {
        try {
            List<Course> courses = courseService.findBySchoolId(id);
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch (GeneralException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
