package com.midas.persistence;

import com.midas.domain.TeamVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;

/**
 * Created by tak on 2016-05-28.
 */
@Repository
public class TeamDAOImpl implements TeamDAO {

    @Inject
    private SqlSession sqlSession;

    private static final String namespace = "com.midas.mapper.TeamMapper";

    @Override
    public int newTeam(TeamVO vo){
        return sqlSession.insert(namespace+".newTeam", vo);
    }

    @Override
    public void deleteTeam(int tid){
        sqlSession.delete(namespace+".deleteTeam",tid);
    }
}
