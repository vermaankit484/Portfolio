package com.google.sps.servlets;

import com.google.sps.data.authenticationInfo;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/auth")
public class Authentication extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authenticationInfo authObject = new authenticationInfo();
        UserService userService = UserServiceFactory.getUserService();
        if (userService.isUserLoggedIn()) {
            authObject.setIsLogin(true);
            // System.out.println(userService.getCurrentUser().getEmail());
            String urlToRedirectToAfterUserLogsOut = "/";
            String logoutUrl = userService.createLogoutURL(urlToRedirectToAfterUserLogsOut);
            authObject.setLogOutUrl(logoutUrl);
        } else {
            String urlToRedirectToAfterUserLogsIn = "/";
            String loginUrl = userService.createLoginURL(urlToRedirectToAfterUserLogsIn);
            authObject.setLoginUrl(loginUrl);
        }
        Gson gson = new Gson();
        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(authObject));
    }
}
