package com.LASU.project.Controller;

import com.LASU.project.Entity.Past_Question;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.Past_QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/past-questions")
public class Past_QuestionController {

    private final Past_QuestionService pastQuestionService;

    public Past_QuestionController(Past_QuestionService pastQuestionService) {
        this.pastQuestionService = pastQuestionService;
    }

    @PostMapping
    public ResponseEntity<?> savePastQuestion(@ModelAttribute Past_Question request,
                                              @RequestPart MultipartFile document) {
        try {
            pastQuestionService.savePastQuestion(request, document);
            return new ResponseEntity<>("Past Question saved successfully", HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<?>> getAllPastQuestions() {
        try {
            List<Past_Question> pastQuestions = pastQuestionService.findAllPastQuestion();
            return new ResponseEntity<>(pastQuestions, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
