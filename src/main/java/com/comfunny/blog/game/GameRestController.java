package com.comfunny.blog.game;

import com.comfunny.blog.config.auth.LoginUser;
import com.comfunny.blog.config.auth.dto.SessionUser;
import com.comfunny.blog.posts.dto.PostsResponseDto;
import com.comfunny.blog.posts.service.PostsService;
import com.comfunny.blog.system.menu.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class GameRestController {

    private final GameService gameService;




    /*************************************************************
     * 게임 메인 페이지로 이동
     *************************************************************/
    @GetMapping("/games")
    public String games(Model model, @LoginUser SessionUser user){
        if(user != null){
            model.addAttribute("userName", user.getName());
            model.addAttribute("userEmail", user.getEmail());
        }
        return "games/game";
    }

    /*************************************************************
     * 사용자정보 불러오기, 가입하기
     *************************************************************/
    @GetMapping("/games/members/{id}")
    public int findById(@PathVariable("id") int id) throws Exception{
        return gameService.findById(id);
    }
    @PostMapping("/games/members")
    public void regId(@RequestBody Map<String, Object> map) throws Exception{
        gameService.regId(map);
    }

    /*************************************************************
     * 캐릭터 기본정보 불러오기
     *************************************************************/
    @GetMapping("/games/initCharacters")
    public Map<String, Object> getInitCharacters() throws Exception{
        return gameService.getInitCharacters();
    }


    /*************************************************************
     * 몬스터 기본정보 불러오기(없음)
     *************************************************************/
    @GetMapping("/games/initMonster")
    public Map<String, Object> getInitMonsters() throws Exception{
        return gameService.getInitMonsters();
    }
}
