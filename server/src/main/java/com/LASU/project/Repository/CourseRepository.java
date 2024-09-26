package com.LASU.project.Repository;


import com.LASU.project.Entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course , Long> {

    @Query("SELECT m FROM Course m WHERE m.courseCode LIKE %:keyword%")
    List<Course> findByCourse(@Param("keyword") String keyword);

    @Query("SELECT b FROM Course b WHERE b.schoolId = :schoolId")
    List <Course> findBySchoolId(@Param("schoolId") String schoolId);
}
