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
    @GetMapping("/systems")
    public String admin(Model model){

        return "systems/admin";
    }

    /************************************************************
     * 메뉴 페이지로 이동
     *************************************************************/
    @GetMapping("/systems/menus")
    public String menu(Model model){
        return "systems/menu";
    }

    /************************************************************
     * 공통코드 페이지로 이동
     *************************************************************/
    @GetMapping("/systems/code")
    public String code(Model model){
        return "systems/code";
    }

    /************************************************************
     * 메세지 페이지로 이동
     *************************************************************/
    @GetMapping("/systems/message")
    public String message(Model model){
        return "systems/message";
    }

    /************************************************************
     * 도메인 페이지로 이동
     *************************************************************/
    @GetMapping("/systems/domain")
    public String domain(Model model){
        return "systems/domain";
    }

}
