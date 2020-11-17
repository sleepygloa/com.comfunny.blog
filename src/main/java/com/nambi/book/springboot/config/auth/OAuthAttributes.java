package com.nambi.book.springboot.config.auth;

import com.nambi.book.springboot.domain.user.Role;
import com.nambi.book.springboot.domain.user.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;


@Getter
public class OAuthAttributes {
    private Map<String, Object> attribute;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;

    @Builder
    public OAuthAttributes(Map<String, Object> attribute, String nameAttributeKey, String name, String email, String picture){
        this.attribute = attribute;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }

    //OAuth2User에서 반환하는 사용자 정보는 Map 이기 때문에 값 하나하나 변환해야한다.
    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        return ofGoogle(userNameAttributeName, attributes);
    }

    public static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes){
        return OAuthAttributes.builder()
                .name((String)attributes.get("name"))
                .email((String)attributes.get("email"))
                .picture((String)attributes.get("picture"))
                .attribute(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
        }

    //User 엔티티 생성
    //OAuthAttributes 에서 엔티티를 생성하는 시점은 처음 가입할때
    //OAuthAttributes 클래스 생성이 끝나면 동일 패키지에 SessionUser 클래스 생성
    public User toEntity(){
        return User.builder()
                .name(name)
                .email(email)
                .picture(picture)
                .role(Role.GUEST)
                .build();

    }
}
