package com.midas.service;

import com.midas.domain.TeamVO;
import com.midas.persistence.TeamDAO;

import javax.inject.Inject;

/**
 * Created by tak on 2016-05-28.
 */
public class teamServiceImpl implements teamService {
    @Inject
    private TeamDAO dao;

    public void newTeam(TeamVO vo){
        dao.newTeam(vo);
    }

    public void deleteTeam(int tid){
        dao.deleteTeam(tid);
    }
}
