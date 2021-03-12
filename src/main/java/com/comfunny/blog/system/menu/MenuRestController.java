package com.comfunny.blog.system.menu;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class MenuRestController {

    private final MenuService menuService;

    @GetMapping("/menu/list")
    public Map<String, Object> menuList(Model model, @RequestParam(value="menuSeq", defaultValue = "-1") int menuSeq) throws Exception{
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("contents", menuService.findAlldesc());

        Map<String, Object> map2 = new HashMap<String, Object>();
        map2.put("data", map);
        map2.put("result", true);
        return map;
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
