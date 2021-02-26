package com.comfunny.blog.blog.dto;

import com.comfunny.blog.blog.domain.Blog;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Setter
@Getter
@NoArgsConstructor
public class BlogSaveRequestDto {

    private String title;
    private String inUserId;
    private String upUserId;
    private String inUserEmail;
    private String upUserEmail;
    private String markdownContent;



    @Builder
    public BlogSaveRequestDto(String title, String inUserId, String upUserId, String inUserEmail, String upUserEmail, String markdownContent) {
        this.title = title;
        this.inUserId = inUserId;
        this.upUserId = upUserId;
        this.inUserEmail = inUserEmail;
        this.upUserEmail = upUserEmail;
        this.markdownContent = markdownContent;
    }


    public Blog toEntity(){
        return Blog.builder()
                .title(title)
                .inUserId(inUserId)
                .upUserId(upUserId)
                .inUserEmail(inUserEmail)
                .upUserEmail(upUserEmail)
                .markdownContent(markdownContent)
                .build();
    }
}
