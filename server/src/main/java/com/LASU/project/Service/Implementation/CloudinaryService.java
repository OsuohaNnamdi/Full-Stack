package com.LASU.project.Service.Implementation;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile displayImage) {
        if (displayImage.isEmpty()) {
            return "";
        }
        try {
            Map<String, String> uploadResult = cloudinary.uploader().upload(displayImage.getBytes(), ObjectUtils.asMap(
                    "transformation", new Transformation().width(600).height(400).crop("fill")
            ));
            return uploadResult.get("url");
        } catch (IOException e) {
            return "";
        }
    }


    public List<String> uploadManyImages(List<MultipartFile> productsImage) {
        List<String> result = new ArrayList<>();
        for (MultipartFile image : productsImage) {
            try {
                Map<String, String> uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.asMap(
                        "transformation", new Transformation().width(600).height(400).crop("fill")
                ));
                result.add(uploadResult.get("url"));
            } catch (IOException e) {
                result.add("");
            }
        }
        return result.stream().filter(str -> !str.isEmpty()).toList();
    }

    public boolean deleteImage(String fileName) {
        String publicId = getPublicIdFromImageUrl(fileName);
        if (publicId == null) {
            return false;
        }
        try {
            Map<String, String> deleteResult = cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resourceType", "image"));
            return deleteResult.get("result").toLowerCase().equals("ok");
        } catch (IOException e) {
            return false;
        }
    }

    public boolean deleteManyImages(List<String> filenames) {
        if (filenames.isEmpty()) {
            return false;
        }
        boolean result = true;
        for (String filename : filenames) {
            try {
                Map<String, String> deleteResult = cloudinary.uploader().destroy(getPublicIdFromImageUrl(filename), ObjectUtils.asMap("resourceType", "image"));
                result &= deleteResult.get("result").toLowerCase().equals("ok");
            } catch (IOException e) {
                result = false;
            }
        }
        return result;
    }

    private String getPublicIdFromImageUrl(String imageUrl) {
        try {
            String[] segments = imageUrl.split("/");
            String lastSegment = segments[segments.length - 1];
            return lastSegment.split("\\.")[0];
        } catch (Exception e) {
            return null;
        }
    }
}
