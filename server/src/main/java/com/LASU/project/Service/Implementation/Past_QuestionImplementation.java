package com.LASU.project.Service.Implementation;


import com.LASU.project.Entity.Past_Question;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.Past_QuestionRepository;
import com.LASU.project.Service.Past_QuestionService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Service
public class Past_QuestionImplementation implements Past_QuestionService {

    private final Past_QuestionRepository questionRepository;
    private final CloudinaryService cloudinaryService;

    public Past_QuestionImplementation(Past_QuestionRepository questionRepository, CloudinaryService cloudinaryService) {
        this.questionRepository = questionRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public void savePastQuestion(Past_Question request, MultipartFile documents) throws IOException {

        String response = cloudinaryService.uploadImage(documents);
        request.setFile(response);
        questionRepository.save(request);
    }



    @Override
    public List<Past_Question> findAllPastQuestion() throws IOException {
        try {
            return questionRepository.findAll();
        } catch (GeneralException e) {
            throw new IOException("Error retrieving Module", e);
        }
    }

}
