package com.comfunny.blog.config.java;

public class StringUtils {
    public static String defaultString(Object obj) {
        return defaultString(obj, "");
    }

    public static String defaultString(Object obj, String defaultStr) {
        return ((obj != null) ? obj.toString() : defaultStr);
    }
}
