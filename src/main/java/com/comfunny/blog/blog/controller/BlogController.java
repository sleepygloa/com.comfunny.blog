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
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class BlogController {

    private final BlogService blogService;

    /************************************************************
     * 블로그 페이지로 이동
     *************************************************************/
    @GetMapping("/blogs")
    public String blog(Model model, @LoginUser SessionUser user){

        List<Map<String, Object>> list = blogService.findAlldesc();
        model.addAttribute("list", list);

        if(list.size() > 0){

            model.addAttribute("detail", blogService.findById(Long.valueOf((int)list.get(0).get("idx"))));
//
//            model.addAttribute("re", blogService.listRe(Long.valueOf((int)list.get(0).get("idx"))));
        }

        if(user != null){
            model.addAttribute("userName", user.getName());
            model.addAttribute("userEmail", user.getEmail());
            model.addAttribute("userPic", user.getPicture());
        }
        if(list.size() == 0){
            return blogPath(model, user, 0l);
        }else{
            return blogPath(model, user, Long.valueOf((int)list.get(0).get("idx")));
        }

    }

    @GetMapping("/blogs/{idx}")
    public String blogPath(Model model, @LoginUser SessionUser user, @PathVariable("idx") Long idx){

        List<Map<String, Object>> list = blogService.findAlldesc();
        model.addAttribute("list", list);


        if(list.size() > 0){

            model.addAttribute("detail", blogService.findById(idx));
//
//            model.addAttribute("re", blogService.listRe(Long.valueOf((int)list.get(0).get("idx"))));
        }

        if(user != null){
            model.addAttribute("userName", user.getName());
            model.addAttribute("userEmail", user.getEmail());
            model.addAttribute("userPic", user.getPicture());
        }
        return "blog/blogs";
    }

}
