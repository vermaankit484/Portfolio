package com.google.sps.data;

public class Comment {
    private final String name;
    private final String comment;
    private final long id;
    private final long timestamp;
    public Comment(String comment, String name, long id, long timestamp) {
        this.comment = comment;
        this.name = name;
        this.id = id;
        this.timestamp = timestamp;
    }
}