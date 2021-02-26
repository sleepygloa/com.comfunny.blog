package com.comfunny.blog.blog.dto;

import com.comfunny.blog.blog.domain.BlogRe;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
public class BlogReListResponseDto {

    private Long idx;
    private Long ref;
    private Long pRef;

    private String content;
    private String delYn;
    private String inUserId;
    private String upUserId;
    private String inUserEmail;
    private String upUserEmail;
    private String picture;

    private LocalDateTime inDt;
    private LocalDateTime upDt;

    private List<BlogReListResponseDto> childList;

//    public BlogReListResponseDto(BlogRe entity){
//        this.idx = entity.getIdx();
//        this.ref = entity.getRef();
//        this.pRef = entity.getPRef();
//        this.content = entity.getContent();
//        this.delYn = entity.getDelYn();
//        this.inUserId = entity.getInUserId();
//        this.upUserId = entity.getUpUserId();
//        this.inUserEmail = entity.getInUserEmail();
//        this.upUserEmail = entity.getUpUserEmail();
//        this.inDt = entity.getInDt();
//        this.upDt = entity.getUpDt();
//    }

}
