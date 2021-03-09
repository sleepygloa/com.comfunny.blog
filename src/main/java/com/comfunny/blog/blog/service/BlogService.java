package com.comfunny.blog.blog.service;

import com.comfunny.blog.blog.domain.*;
import com.comfunny.blog.blog.dto.*;
import com.comfunny.blog.config.auth.LoginUser;
import com.comfunny.blog.config.auth.dto.SessionUser;
import com.comfunny.blog.posts.domain.Posts;
import com.comfunny.blog.posts.dto.PostsResponseDto;
import com.comfunny.blog.posts.dto.PostsUpdateRequestDto;
import com.comfunny.blog.system.code.CodeDao;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BlogService {


    //글 제목
    private final BlogRepository blogRepository;

    //글 카테고리
    private final BlogCategoryRepository blogCategoryRepository;

    //글 상세
    private final BlogDetailRepository blogDetailRepository;

    //댓글
    private final BlogReRepository blogReRepository;

    @Autowired
    private CodeDao codeDao;
    private final BlogDao blogDao;

    @Transactional(readOnly = true)
    public List<Map<String, Object>> findAlldesc(){
        return blogDao.list();
    }

//    @Transactional(readOnly = true)
//    public List<BlogListResponseDto> findAlldesc(String searchA){
//        return blogRepository.findAllDesc(searchA).stream()
//                .map(BlogListResponseDto::new)
//                .collect(Collectors.toList());
//    }
//
//    @Transactional(readOnly = true)
//    public List<BlogListResponseDto> findAlldesc(String searchA, String searchB){
//        return blogRepository.findAllDesc(searchA, searchB).stream()
//                .map(BlogListResponseDto::new)
//                .collect(Collectors.toList());
//    }

    public BlogListResponseDto findById(Long idx){
        Blog entity = blogRepository.findById(idx)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + idx));
        return new BlogListResponseDto(entity);
    }

//    @Transactional(readOnly = true)
//    public List<BlogListCategoryResponseDto> findCategory(){
//        return blogCategoryRepository.findCategory().stream()
//                .map(BlogListCategoryResponseDto::new)
//                .collect(Collectors.toList());
//    }

    @Transactional
    public Long save(BlogSaveRequestDto dto){
        return blogRepository.save(dto.toEntity()).getIdx();
    }

    @Transactional
    public Long update(Long idx, BlogSaveRequestDto requestDto){
        Blog blog = blogRepository.findById(idx)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + idx));

        blog.update(requestDto.getTitle(), requestDto.getUpUserId(), requestDto.getUpUserEmail(), requestDto.getMarkdownContent());

        return idx;
    }

    @Transactional
    public void delete (Map data){
        int idx = Integer.parseInt((String)data.get("idx"));

        int cnt = blogRepository.findMaster(idx);
        if(cnt == 0) new IllegalArgumentException("해당 게시글이 없습니다. id="+idx);

        blogRepository.delete(idx);
    }


    @Transactional(readOnly = true)
    public List<Map<String, Object>> listRe(Long idx){

        Map<String, Object> map = new HashMap<>();
        map.put("idx", idx);

        List<Map<String, Object>> list =  blogDao.listRe(map);

        for(Map<String, Object> map2 : list){
            map.put("ref", Long.valueOf((int)list.get(0).get("ref")));
            List<Map<String, Object>> childList = blogDao.listReChild(map);
            if(childList.size() > 0) map2.put("re", childList);

        }

        return list;
    }

    @Transactional
    public Long saveRe(BlogReSaveRequestDto dto){
        return blogReRepository.save(dto.toEntity()).getIdx();
    }

    @Transactional
    public void deleteRe(Long ref){

        int cnt = blogReRepository.findMaster(ref);
        if(cnt == 0) new IllegalArgumentException("해당 게시글이 없습니다. id="+ref);

        blogReRepository.deleteRe(ref);
    }


    @Transactional
    public void saveMd(Map data, SessionUser user){
        int idx = Integer.parseInt((String)data.get("idx"));
        int cnt = blogRepository.findMaster(idx);
        if(cnt == 0){
            idx = blogRepository.findMaxMaster();
            blogRepository.insertMd(idx, 0, (String)data.get("categoryA"),(String)data.get("categoryB"),(String)data.get("categoryC"), (String)data.get("title"), (String)data.get("content"), (String)data.get("url"), user.getName(), user.getEmail());
        }else{
            blogRepository.updateMd(idx, (String)data.get("categoryA"),(String)data.get("categoryB"),(String)data.get("categoryC"), (String)data.get("title"), (String)data.get("content"), (String)data.get("url"), user.getName(), user.getEmail());
        }

    }
//	@Override
//	public void saveBlogFileUpload(Params inParams, MultipartHttpServletRequest req) throws Exception{
//
//		blogDao.deleteMainBlogFileList(inParams);
//		List<Map<String,Object>> list = fileUtils.parseUpdateFileInfo(inParams, req);
//		Map<String,Object> tempMap = null;
//		for(int i=0, size=list.size(); i<size; i++){
//			tempMap = list.get(i);
//			if(tempMap.get("IS_NEW").equals("Y")){
//				blogDao.insertMainBlogFile(tempMap);
//			}else{
//				blogDao.updateMainBlogFile(tempMap);
//			}
//		}
//	}


    //	public void insertMainBlogFile(Map<String, Object> map) throws Exception{
//		insert("blogService.insertMainBlogFile", map);
//	}
//
//	@SuppressWarnings("unchecked")
//	public List<Map<String, Object>> selectFileList(Map<String, Object> map) throws Exception{
//		return (List<Map<String, Object>>)selectList("blogService.getMainBlogSelectFileList", map);
//	}
//
//	public void deleteMainBlogFileList(Map<String, Object> map) throws Exception{
//		update("blogService.deleteMainBlogFileList", map);
//	}
//
//	public void updateMainBlogFile(Map<String, Object> map) throws Exception{
//		update("blogService.updateMainBlogFile", map);
//	}
//






//<!-- 파일 업로드 -->
//	<insert id="insertMainBlogFile" parameterType="hashmap" useGeneratedKeys="true" keyProperty="IDX">
// 	 	<selectKey keyProperty="IDX" resultType="int" order="BEFORE">
//    SELECT IFNULL(MAX(IDX) + 1, 1) AS IDX FROM TB_BLOG_D_FILE
//		</selectKey>
//    INSERT INTO TB_BLOG_D_FILE
//            (
//                    IDX,
//                    BOARD_IDX,
//                    ORIGINAL_FILE_NAME,
//                    STORED_FILE_NAME,
//                    FILE_SIZE,
//                    IN_DT,
//                    S_USERID
//                    )
//    VALUES
//            (
//				#{IDX},
//            #{boardIdx},
//            #{originalFileName},
//            #{storedFileName},
//            #{fileSize},
//    now(),
//				#{s_userId}
//			)
//	</insert>
//
//	<select id="getMainBlogSelectFileList" parameterType="hashmap" resultType="hashmap">
//    SELECT
//            IDX
//            ,	BOARD_IDX
//            ,	ORIGINAL_FILE_NAME
//		,   ROUND(FILE_SIZE/1024,1) AS FILE_SIZE
//    FROM
//            TB_BLOG_D_FILE
//    WHERE
//    BOARD_IDX = #{idx}
//    AND DEL_YN = 'N'
//            </select>
//
//	<update id="deleteMainBlogFileList" parameterType="hashmap">
//    UPDATE
//            TB_BLOG_D_FILE
//    SET
//            DEL_YN = 'Y'
//    WHERE
//    BOARD_IDX = #{idx}
//	</update>
//
//	<update id="updateMainBlogFile" parameterType="hashmap">
//    UPDATE
//            TB_BLOG_D_FILE
//    SET
//            DEL_YN = 'N'
//    WHERE
//    IDX = #{file_idx}
//	</update>

}
