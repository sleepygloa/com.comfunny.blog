package com.comfunny.blog.blog.dto;

import com.comfunny.blog.blog.domain.Blog;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BlogListResponseDto {

    private Long idx;
    private Long pIdx;

    private String categoryA;
    private String categoryB;
    private String categoryC;
    private String title;
    private String useYn;
    private String delYn;
    private String inUserId;
    private String upUserId;

    private LocalDateTime inDt;
    private LocalDateTime upDt;

    private String githubUrl;
    private String markdownContent;

    public BlogListResponseDto(Blog entity){
        this.idx = entity.getIdx();
        this.pIdx = entity.getPIdx();
        this.categoryA = entity.getCategoryA();
        this.categoryB = entity.getCategoryB();
        this.categoryC = entity.getCategoryC();
        this.title = entity.getTitle();
        this.useYn = entity.getUseYn();
        this.delYn = entity.getDelYn();
        this.inUserId = entity.getInUserId();
        this.upUserId = entity.getUpUserId();
        this.inDt = entity.getInDt();
        this.upDt = entity.getUpDt();
        this.githubUrl = entity.getGithubUrl();
        this.markdownContent = entity.getMarkdownContent();
    }

}
