package com.comfunny.blog.blog.domain;

import com.comfunny.blog.domain.BaseTimeEntity2;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class BlogRe extends BaseTimeEntity2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ref;

    @ColumnDefault("0")
    private Long pRef;

    @Column(nullable = false)
    private Long idx;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String passwd;

    @ColumnDefault("N")
    @Column(insertable = false)
    private String delYn;

    @Column(nullable = false)
    private String inUserId;

    @Column(nullable = false)
    private String upUserId;

    @Column(nullable = false)
    private String inUserEmail;

    @Column(nullable = false)
    private String upUserEmail;

    @Builder
    public BlogRe(Long ref, Long pRef, Long idx, String content, String passwd, String inUserId, String upUserId, String inUserEmail, String upUserEmail) {
        this.ref = ref;
        this.pRef = pRef;
        this.idx = idx;
        this.content = content;
        this.passwd = passwd;
        this.inUserId = inUserId;
        this.upUserId = upUserId;
        this.inUserEmail = inUserEmail;
        this.upUserEmail = upUserEmail;
    }



    public void update(String content, String passwd, String delYn, String upUserId, String upUserEmail) {
        this.content = content;
        this.passwd = passwd;
        this.delYn = delYn;
        this.upUserId = upUserId;
        this.upUserEmail = upUserEmail;
    }



}
