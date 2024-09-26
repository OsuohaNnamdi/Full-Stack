package com.LASU.project.Repository;

import com.LASU.project.Entity.Past_Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Past_QuestionRepository extends JpaRepository<Past_Question, Long>
{
    @Query("SELECT m FROM Past_Question m WHERE m.courseCode LIKE %:keyword%")
    List<Past_Question> findByPastQuestion(@Param("keyword") String keyword);



    @Query("SELECT b FROM Past_Question b WHERE b.schoolId = :schoolId")
    List <Past_Question> findBySchoolId(@Param("schoolId") String schoolId);
}
