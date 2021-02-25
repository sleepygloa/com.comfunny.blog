package com.comfunny.blog.blog.controller;

import com.comfunny.blog.blog.dto.*;
import com.comfunny.blog.blog.service.BlogService;
import com.comfunny.blog.config.auth.LoginUser;
import com.comfunny.blog.config.auth.dto.SessionUser;
import com.comfunny.blog.posts.dto.PostsResponseDto;
import com.comfunny.blog.posts.dto.PostsSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class BlogRestController {

    private final BlogService blogService;

    /***************************************
     * 블로그 리스트 조회
     ***************************************/
    @GetMapping("/blogss")
    public List<BlogListResponseDto> blogFindAllDesc(@RequestParam(value="searchA", defaultValue = "") String searchA, @RequestParam(value="searchB", defaultValue = "") String searchB, Model model){
        if(searchA.equals("")){
            List<BlogListResponseDto> list = blogService.findAlldesc();
            model.addAttribute("list", list);
            return null;

        }else{
            if(searchB.equals("")){
                try {
                    searchA  = URLDecoder.decode(searchA, StandardCharsets.UTF_8.toString());
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                return blogService.findAlldesc(searchA);

            }else{
                try {
                    searchA  = URLDecoder.decode(searchA, StandardCharsets.UTF_8.toString());
                    searchB  = URLDecoder.decode(searchB, StandardCharsets.UTF_8.toString());
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                return blogService.findAlldesc(searchA, searchB);
            }

        }

    }


    /***************************************
     * 글 상세보기
     ***************************************/
    @GetMapping("/blogs/content/{idx}")
    public BlogListResponseDto blogFindById(@PathVariable("idx") Long idx, Model model){
        return blogService.findById(idx);
    }

    /***************************************
     * 글  신규 저장
     ***************************************/
    @PostMapping("/blogs/content/")
    public Long save(@RequestBody BlogSaveRequestDto requestDto, @LoginUser SessionUser user){
//        requestDto.setInUserId(user.getName());
//        requestDto.setUpUserId(user.getName());
//        requestDto.setInUserEmail(user.getEmail());
//        requestDto.setUpUserEmail(user.getEmail());

        return blogService.save(requestDto);
    }

    /***************************************
     * 글 수정 저장
     ***************************************/
    @PutMapping("/blogs/content/{idx}")
    public Long update(@PathVariable("idx") Long idx, @RequestBody BlogSaveRequestDto requestDto, @LoginUser SessionUser user){
//        requestDto.setInUserId(user.getName());
//        requestDto.setUpUserId(user.getName());
//        requestDto.setInUserEmail(user.getEmail());
//        requestDto.setUpUserEmail(user.getEmail());

        return blogService.update(idx, requestDto);
    }


    
    /***************************************
     * 블로그 카테고리 데이터셋 조회
     ***************************************/
    @GetMapping("/b/blog/listCategory")
    public List<BlogListCategoryResponseDto> findGetegory(){ return blogService.findCategory(); }



    /***************************************
     * 글삭제
     ***************************************/
    @DeleteMapping("/b/blog/delete")
    public void delete(@RequestBody Map data){
        blogService.delete(data);
    }



    /***************************************
     * 댓글 리스트 조회
     ***************************************/
    @GetMapping("/blogs/content/re/{idx}")
    public List<BlogReListResponseDto> listRe(@PathVariable("idx") int idx){
        return blogService.listRe(idx);
    }

    /***************************************
     * 댓글 저장
     ***************************************/
    @PostMapping("/b/blog/saveRe")
    public void saveRe(@RequestBody Map data, @LoginUser SessionUser user){ blogService.saveRe(data, user); }

    /***************************************
     * 댓글 삭제
     ***************************************/
    @DeleteMapping("/b/blog/deleteRe")
    public void deleteRe(@RequestBody Map data){ blogService.deleteRe(data); }

    /***************************************
     * 글 저장 (md)
     ***************************************/
    @PostMapping("/b/blog/saveMd")
    public void saveMd(@RequestBody Map data, @LoginUser SessionUser user){
        blogService.saveMd(data, user);
    }


    //	//블로그 글 수정완료 후 파일 업로드
//	@RequestMapping("/b/blogFileUpload")
//	public ModelAndView saveBlogFileUpload(MultipartHttpServletRequest req) {
//		System.out.println("/saveBlogFileUpload inParams : "+inParams);
//		ModelAndView mv = new ModelAndView("jsonView");
//		try {
//			blogService.saveBlogFileUpload(inParams, req);
//		}catch(Exception e) {
//			System.out.println("ERROR" + e);
//			e.printStackTrace();
//		}
//		mv.addObject("SUCCESS", "글이 수정되었습니다.");
//		return mv;
//	}

}
