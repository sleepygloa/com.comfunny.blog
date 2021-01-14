package com.comfunny.blog.web;

import com.comfunny.blog.config.auth.LoginUser;
import com.comfunny.blog.config.auth.dto.SessionUser;
import com.comfunny.blog.service.posts.PostsService;
import com.comfunny.blog.web.dto.blog.Post;
import com.comfunny.blog.web.dto.post.PostsResponseDto;
import lombok.RequiredArgsConstructor;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Controller
public class BlogController {

    /************************************************************
     * 블로그 페이지로 이동
     *************************************************************/
    @GetMapping("/i/blog")
    public String blog(Model model){
        model.addAttribute("ADMIN_YN" , "Y");

        return "blog/blog";
    }

    @GetMapping("/i/blog/md")
    public String md(Model model){
        return "blog/blogMd";
    }

    @GetMapping("/i/blog/mdView/")
    public String mdView(Model model){
//        post.setHtml(markdownToHTML(post.getContent()));
//        model.addAttribute("post", post);
        return "blog/blogMdView";
    }

    @PostMapping("")
    public String save(Post post, Model model) {
        post.setHtml(markdownToHTML(post.getContent()));
        model.addAttribute("post", post);
        return "blog/saved";
    }

    private String markdownToHTML(String markdown) {
        Parser parser = Parser.builder()
                .build();

        Node document = parser.parse(markdown);
        HtmlRenderer renderer = HtmlRenderer.builder()
                .build();
        System.out.println(renderer.render(document));
        return renderer.render(document);
    }
}
