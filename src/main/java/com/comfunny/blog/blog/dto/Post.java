package com.comfunny.blog.blog.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Post {

    private String title;
    private String content;
    private String html;
}