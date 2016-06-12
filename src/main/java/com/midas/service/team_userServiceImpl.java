package com.midas.service;

import com.midas.domain.Team_userVO;
import com.midas.persistence.TeamDAO;
import com.midas.persistence.Team_userDAO;

import javax.inject.Inject;

/**
 * Created by tak on 2016-05-28.
 */
public class team_userServiceImpl implements team_userService{

    @Inject
    private Team_userDAO dao;

    public void insertTeam(Team_userVO vo){
        dao.insertTeam(vo);
    }


    public void deleteTeam_user(Team_userVO vo){
        dao.deleteTeam_user(vo);
    }
}
