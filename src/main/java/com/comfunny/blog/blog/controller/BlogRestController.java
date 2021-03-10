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
     * 글 상세보기(미사용)
     ***************************************/
    @GetMapping("/blogs/content/{idx}")
    public BlogListResponseDto blogFindById(@PathVariable("idx") Long idx, Model model){
        return blogService.findById(idx);
    }

    /***************************************
     * 글  신규 저장
     ***************************************/
    @PostMapping("/blogs/")
    public Long save(@RequestBody BlogSaveRequestDto requestDto, @LoginUser SessionUser user){
        requestDto.setInUserId(user.getName());
        requestDto.setUpUserId(user.getName());
        requestDto.setInUserEmail(user.getEmail());
        requestDto.setUpUserEmail(user.getEmail());

        return blogService.save(requestDto);
    }

    /***************************************
     * 글 수정 저장
     ***************************************/
    @PutMapping("/blogs/{idx}")
    public Long update(@PathVariable("idx") Long idx, @RequestBody BlogSaveRequestDto requestDto, @LoginUser SessionUser user){
        requestDto.setInUserId(user.getName());
        requestDto.setUpUserId(user.getName());
        requestDto.setInUserEmail(user.getEmail());
        requestDto.setUpUserEmail(user.getEmail());

        return blogService.update(idx, requestDto);
    }


    
    /***************************************
     * 블로그 카테고리 데이터셋 조회
     ***************************************/
//    @GetMapping("/b/blog/listCategory")
//    public List<BlogListCategoryResponseDto> findGetegory(){ return blogService.findCategory(); }



    /***************************************
     * 글삭제
     ***************************************/
    @DeleteMapping("/blogs/{idx}")
    public void delete(@PathVariable("idx") int idx){
        blogService.delete(idx);
    }



    /***************************************
     * 댓글 리스트 조회
     ***************************************/
    @GetMapping("/blogs/re/{idx}")
    public List<Map<String, Object>> listRe(@PathVariable("idx") Long idx){
        return blogService.listRe(idx);
    }

    /***************************************
     * 댓글 신규 저장
     ***************************************/
    @PostMapping("/blogs/re")
    public Long saveRe(@RequestBody BlogReSaveRequestDto requestDto, @LoginUser SessionUser user){
        requestDto.setInUserId(user.getName());
        requestDto.setUpUserId(user.getName());
        requestDto.setInUserEmail(user.getEmail());
        requestDto.setUpUserEmail(user.getEmail());

        return blogService.saveRe(requestDto);
    }

    /***************************************
     * 댓글 수정 저장
     ***************************************/
    @PutMapping("/blogs/re/{ref}")
    public Long updateRe(@PathVariable("ref") Long ref, @RequestBody BlogReSaveRequestDto requestDto, @LoginUser SessionUser user){
        requestDto.setInUserId(user.getName());
        requestDto.setUpUserId(user.getName());
        requestDto.setInUserEmail(user.getEmail());
        requestDto.setUpUserEmail(user.getEmail());

        requestDto.setRef(ref);

        return blogService.saveRe(requestDto);
    }

    /***************************************
     * 댓글 삭제
     ***************************************/
    @DeleteMapping("/blogs/re/{ref}")
    public void deleteRe(@PathVariable("ref") Long ref, @LoginUser SessionUser user){
        blogService.deleteRe(ref);
    }
//
//    /***************************************
//     * 글 저장 (md)
//     ***************************************/
//    @PostMapping("/b/blog/saveMd")
//    public void saveMd(@RequestBody Map data, @LoginUser SessionUser user){
//        blogService.saveMd(data, user);
//    }


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
