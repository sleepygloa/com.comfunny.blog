package com.comfunny.blog.system;

import com.comfunny.blog.blog.dto.Post;
import lombok.RequiredArgsConstructor;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Controller
public class SystemController {

    /************************************************************
     * 메뉴 페이지로 이동
     *************************************************************/
    @GetMapping("/system")
    public String admin(Model model){
        return "system/admin";
    }

    /************************************************************
     * 메뉴 페이지로 이동
     *************************************************************/
    @GetMapping("/system/menu")
    public String menu(Model model){
        return "system/menu";
    }

    /************************************************************
     * 공통코드 페이지로 이동
     *************************************************************/
    @GetMapping("/system/code")
    public String code(Model model){
        return "system/code";
    }

}
