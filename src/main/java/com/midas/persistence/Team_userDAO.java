package com.midas.persistence;

import com.midas.domain.Team_userVO;

/**
 * Created by tak on 2016-05-28.
 */
public interface Team_userDAO {
    public void insertTeam(Team_userVO vo);

    public void deleteTeam_user(Team_userVO vo);
}
