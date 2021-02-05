# 블로그


### 개발환경.
1. Spring Boot 2.1.7
2. Jpa, Hibernate
3. MariaDB in AWS LightSail
4. Github
5. Travis, deploy
6. bootstrap, Jquery, Ireport


### 기능
1. OAuth2 로그인 API 를 이용한 (Google, Naver) 로그인 환경 구성.
2. Spring Security 를 이용한 권한 제한(페이지, 프로그램 내 UI 노출 등)
3. Travis, CI/CD 및 Tool 을 이용한 자동배포.
4. JPA와 Mybatis 를 연결
5. Github을 이용한 버전관리, 작업영역, 노출영역 Branch 분리.

### 구현내용 History

##### 1.0 기본기능구현 (만들고 이후 정리한 것이라 순서는 맞지않음)
1. JPA, Hibernate 를 이용한 게시판 구현
2. OAuth2 를 이용한 로그인 구현
3. 개인개발한 Grid 와 게시판, 댓글 기능이있는 JS 붙이기.
4. 3번 호환 및 버그 수정. (반복)
5. 사용자롤 생성.
6. DB 세션을 활용하도록 수정 --> 동일한사람이 멀티브라우저, 디바이스에서 접속할때 세션 에러뜸.
7. 이력서 구현
8. LEFT 를 최상단 메뉴만 노출되는 동적형태로 변경.
9. 게시판을 마크다운으로 작성할 수 있게 수정(slimesde)
10. 톰캣 구동시 세션 삭제되게 수정 
11. JQGrid Library도입, 기존소스 JQGrid 형태에 맞게 수정.

##### 1.1 SCM 관련 소스









- markdown
simplemde
homepage: https://simplemde.com/
github : https://github.com/sparksuite/simplemde-markdown-editor

- markdown
스크립트 코딩
parse 기능, markdown to html 

- Grid
스크립트 코딩
기존 오픈소스형태 LIbrary 경험 기반 DataSet 을 활용한 Grid Row 형태 CRUD, Fomr 형태 CRUD, 대댓글 CRUD 구현
