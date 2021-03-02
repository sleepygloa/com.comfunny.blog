package com.comfunny.blog.blog.dto;

import com.comfunny.blog.blog.domain.BlogRe;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class BlogReSaveRequestDto {
    private Long idx;
    private Long ref;
    private Long pRef;
    private String content;
    private String passwd;

    private String inUserId;
    private String upUserId;
    private String inUserEmail;
    private String upUserEmail;

    @Builder
    public BlogReSaveRequestDto(Long idx, Long ref, Long pRef, String content, String passwd, String inUserId, String upUserId, String inUserEmail, String upUserEmail) {
        this.idx = idx;
        this.ref = ref;
        this.pRef = pRef;
        this.content = content;
        this.passwd = passwd;
        this.inUserId = inUserId;
        this.upUserId = upUserId;
        this.inUserEmail = inUserEmail;
        this.upUserEmail = upUserEmail;
    }





    public BlogRe toEntity(){
        return BlogRe.builder()
                .idx(idx)
                .ref(ref)
                .pRef(pRef)
                .content(content)
                .passwd(passwd)
                .inUserId(inUserId)
                .upUserId(upUserId)
                .inUserEmail(inUserEmail)
                .upUserEmail(upUserEmail)
                .build();
    }
}
