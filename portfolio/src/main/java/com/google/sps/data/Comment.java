package com.google.sps.data;

public class Comment {
    private final String email;
    private final String comment;
    private final long id;
    private final long timestamp;
    public Comment(String comment, String email, long id, long timestamp) {
        this.comment = comment;
        this.email = email;
        this.id = id;
        this.timestamp = timestamp;
    }
}