package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/user-comments")
public class UserComments extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query commentQuery = new Query("comments").addSort("timestamp", SortDirection.DESCENDING);

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery resultComments = datastore.prepare(commentQuery);

        List<Comment> CommentList= new ArrayList<Comment>();

        for (Entity commentEntity: resultComments.asIterable()) {
            String name = (String) commentEntity.getProperty("name");
            String comment = (String) commentEntity.getProperty("comment");
            long id = (long) commentEntity.getKey().getId();
            long timestamp = (long) commentEntity.getProperty("timestamp");

            Comment commentObj = new Comment(comment, name, id, timestamp);
            CommentList.add(commentObj);
        }

        Gson gson = new Gson();
        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(CommentList));
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String comment = request.getParameter("comment");
        String name = request.getParameter("name");
        long timestamp = System.currentTimeMillis();

        Entity commentEntity = new Entity("comments");
        commentEntity.setProperty("comment", comment);
        commentEntity.setProperty("name", name);
        commentEntity.setProperty("timestamp", timestamp);

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.put(commentEntity);

        response.sendRedirect("/");
    }
}
