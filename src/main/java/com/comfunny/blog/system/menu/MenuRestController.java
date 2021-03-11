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

    @GetMapping("/menu/list")
    public List<Map<String, Object>> menuList(@RequestParam(value="menuSeq", defaultValue = "-1") int menuSeq) throws Exception{
        return menuService.findAlldesc();
    }

    @GetMapping("/systems/menu/list")
    public List<Map<String, Object>> list()  throws Exception{
        return menuService.systemList();
    }


    @PostMapping("/systems/menu/{idx}")
    public void save(@RequestBody Map map){
        ObjectMapper mapper = new ObjectMapper();
        List<MenuSaveRequestDto> list =  mapper.convertValue((List<MenuSaveRequestDto>)map.get("list"), new TypeReference<List<MenuSaveRequestDto>>() {});

        menuService.save(list);
    }


}
