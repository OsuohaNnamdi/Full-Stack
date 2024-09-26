package com.LASU.project.Service;

import com.LASU.project.Entity.Past_Question;
import com.LASU.project.Exception.GeneralException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface Past_QuestionService {

    void savePastQuestion(Past_Question module, MultipartFile documents) throws IOException;

    List<Past_Question> findAllPastQuestion()throws IOException;

}
