package com.midas.service;

import com.midas.domain.ListVO;
import com.midas.domain.TeamVO;
import com.midas.domain.Team_userVO;
import com.midas.persistence.ListDAO;
import com.midas.persistence.TeamDAO;
import com.midas.persistence.Team_userDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.lang.Exception;import java.lang.Override;import java.util.List;

/**
 * Created by broduck on 2016. 5. 28..
 */

@Service
public class ListServiceImpl implements ListService {

    @Inject
    ListDAO listDAO;

    @Inject
    TeamDAO teamDAO;

    @Inject
    Team_userDAO teamUserDAO;

    @Override
    public List<ListVO> readList(int uid) throws Exception {
        return listDAO.readAllList(uid);
    }

    @Transactional
    @Override
    public void registList(ListVO vo) throws Exception {
        TeamVO teamVO = new TeamVO();
        teamVO.setTeam_name(vo.getList_name());

        teamDAO.newTeam(teamVO);

        Team_userVO team_userVO = new Team_userVO();

        team_userVO.setUid(vo.getUid());
        team_userVO.setTid(teamVO.getTid());

        teamUserDAO.insertTeam(team_userVO);

        vo.setTid(teamVO.getTid());

        listDAO.createList(vo);
    }

    @Override
    public void modifyList(ListVO vo) throws Exception {
        listDAO.updateList(vo);
    }

    @Override
    public void removeList(int lid) throws Exception {
        listDAO.deleteList(lid);
    }
}
