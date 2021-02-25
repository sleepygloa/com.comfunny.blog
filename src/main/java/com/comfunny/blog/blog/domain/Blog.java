package com.comfunny.blog.blog.domain;

import com.comfunny.blog.domain.BaseTimeEntity2;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Blog extends BaseTimeEntity2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long idx;

    private Long pIdx;

    private String categoryA;

    private String categoryB;

    private String categoryC;


    @Column(nullable = false)
    private String title;

    @Column(insertable = false)
    @ColumnDefault("Y")
    private String useYn;

    @Column(insertable = false)
    @ColumnDefault("N")
    private String delYn;

    @Column(nullable = false)
    private String inUserId;

    @Column(nullable = false)
    private String upUserId;

    @Column(nullable = false)
    private String inUserEmail;

    @Column(nullable = false)
    private String upUserEmail;

    private String githubUrl;

    @Column(nullable = false)
    private String markdownContent;

    @Builder
    public Blog(Long idx, Long pIdx, String categoryA, String categoryB, String categoryC, String title, String useYn, String delYn, String inUserId, String upUserId, String inUserEmail, String upUserEmail, String githubUrl, String markdownContent) {
        this.idx = idx;
        this.pIdx = pIdx;
        this.categoryA = categoryA;
        this.categoryB = categoryB;
        this.categoryC = categoryC;
        this.title = title;
        this.useYn = useYn;
        this.delYn = delYn;
        this.inUserId = inUserId;
        this.upUserId = upUserId;
        this.inUserEmail = inUserEmail;
        this.upUserEmail = upUserEmail;
        this.githubUrl = githubUrl;
        this.markdownContent = markdownContent;
    }

    public void update(String title,String upUserId, String upUserEmail, String markdownContent) {
        this.title = title;
        this.upUserId = upUserId;
        this.upUserEmail = upUserEmail;
        this.markdownContent = markdownContent;
    }





}
