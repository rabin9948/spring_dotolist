package com.midas.persistence;

import com.midas.domain.TeamVO;

/**
 * Created by tak on 2016-05-28.
 */
public interface TeamDAO {
    public int newTeam(TeamVO vo);

    public void deleteTeam(int tid);
}
