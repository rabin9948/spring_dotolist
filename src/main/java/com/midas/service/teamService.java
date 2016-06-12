package com.midas.service;

import com.midas.domain.TeamVO;

/**
 * Created by tak on 2016-05-28.
 */
public interface teamService {
    public void newTeam(TeamVO vo);

    public void deleteTeam(int tid);
}
