package com.comfunny.blog.system.menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query(value = "SELECT max(menuSeq)+1 as max FROM Menu " )
    Long findMaxMaster();

    @Query(value = "INSERT INTO menu (MENU_SEQ, MENU_PARENT_SEQ, MENU_CD, MENU_NM, MENU_ICON, MENU_URL, MENU_ORDER, DEVICE_FLAG, BLOG_YN, USE_YN) " +
            " VALUES (:menuSeq, :menuParentSeq, :menuCd, :menuNm, :menuIcon, :menuUrl, :menuOrder, :deviceFlag, :blogYn, :useYn)", nativeQuery = true)
    void insertMaster(@Param("menuSeq") Long menuSeq, @Param("menuParentSeq") Long menuParentSeq, @Param("menuCd") String menuCd, @Param("menuNm") String menuNm,
                 @Param("menuIcon") String menuIcon,
                 @Param("menuUrl") String menuUrl,
                 @Param("menuOrder") String menuOrder,
                 @Param("deviceFlag") String deviceFlag,
                 @Param("blogYn") String blogYn,
                 @Param("useYn") String useYn);

    @Query(value = "SELECT count(*) as cnt FROM menu WHERE MENU_SEQ = :menuSeq ", nativeQuery = true)
    int findRow(@Param("menuSeq") Long menuSeq);

    @Query(value = "UPDATE menu SET MENU_PARENT_SEQ = :menuParentSeq, MENU_CD = :menuCd, MENU_NM = :menuNm, MENU_ICON = :menuIcon, MENU_URL = :menuUrl, MENU_ORDER = :menuOrder, DEVICE_FLAG = :deviceFlag, BLOG_YN = :blogYn, USE_YN = :useYn WHERE MENU_SEQ = :menuSeq", nativeQuery = true)
    void saveRow(@Param("menuSeq") Long menuSeq, @Param("menuParentSeq") Long menuParentSeq, @Param("menuCd") String menuCd, @Param("menuNm") String menuNm,
                 @Param("menuIcon") String menuIcon,
                 @Param("menuUrl") String menuUrl,
                 @Param("menuOrder") String menuOrder,
                 @Param("deviceFlag") String deviceFlag,
                 @Param("blogYn") String blogYn,
                 @Param("useYn") String useYn);




}
