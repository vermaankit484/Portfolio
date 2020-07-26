package com.google.sps.data;

public class authenticationInfo {
    private String logOutUrl;
    
    private boolean isLogin;

    private String loginUrl;
    public authenticationInfo() {
        this.isLogin = false;
    }

    public void setLogOutUrl(String logOutUrl) {
        this.logOutUrl = logOutUrl;
    }

    public void setLoginUrl(String loginUrl) {
        this.loginUrl = loginUrl;
    }

    public void setIsLogin(boolean isLogin) {
        this.isLogin = isLogin;
    }
}