package com.midas.domain;

import java.util.Date;

/**
 * Created by broduck on 2016. 5. 28..
 */
public class UserVO {

    private int uid;
    private String id;
    private String password;
    private String email;
    private String sessionKey;
    private Date sessionLimit;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }

    public Date getSessionLimit() {
        return sessionLimit;
    }

    public void setSessionLimit(Date sessionLimit) {
        this.sessionLimit = sessionLimit;
    }
}
