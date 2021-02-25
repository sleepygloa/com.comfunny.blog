package com.comfunny.blog.system;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class SystemController {

    /************************************************************
     * 관리자 페이지로 이동
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

    /************************************************************
     * 메세지 페이지로 이동
     *************************************************************/
    @GetMapping("/system/message")
    public String message(Model model){
        return "system/message";
    }

    /************************************************************
     * 도메인 페이지로 이동
     *************************************************************/
    @GetMapping("/system/domain")
    public String domain(Model model){
        return "system/domain";
    }

}
