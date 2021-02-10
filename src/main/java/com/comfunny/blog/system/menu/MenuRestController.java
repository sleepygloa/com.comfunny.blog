package com.comfunny.blog.system.menu;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class MenuRestController {

    private final MenuService menuService;

    @GetMapping("/b/menu/list")
    public List<MenuListResponseDto> list(@RequestParam(value="menuSeq", defaultValue = "-1") int menuSeq){

        if(menuSeq == -1){
            return menuService.findAlldesc();
        }else{
            return menuService.findAlldesc(menuSeq);
        }
    }


    @PostMapping("/b/menu/save")
    public void save(@RequestBody Map map){
        ObjectMapper mapper = new ObjectMapper();
        List<MenuSaveRequestDto> list =  mapper.convertValue((List<MenuSaveRequestDto>)map.get("list"), new TypeReference<List<MenuSaveRequestDto>>() {});

        menuService.save(list);
    }


}
