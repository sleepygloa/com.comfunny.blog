package com.comfunny.blog.blog.controller;

import com.comfunny.blog.blog.dto.BlogListResponseDto;
import com.comfunny.blog.blog.service.BlogService;
import com.comfunny.blog.config.auth.LoginUser;
import com.comfunny.blog.config.auth.dto.SessionUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class BlogController {

    private final BlogService blogService;

    /************************************************************
     * 블로그 페이지로 이동
     *************************************************************/
    @GetMapping("/blogs")
    public String blog(Model model, @LoginUser SessionUser user){

        List<BlogListResponseDto> list = blogService.findAlldesc();
        model.addAttribute("list", list);

        if(user != null){
            model.addAttribute("userName", user.getName());
            model.addAttribute("userEmail", user.getEmail());
        }
        return "blog/blogs";
    }


}
