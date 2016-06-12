package com.midas.persistence;

import com.midas.domain.Team_userVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;

/**
 * Created by tak on 2016-05-28.
 */
@Repository
public class Team_userDAOImpl implements Team_userDAO {

    @Inject
    private SqlSession sqlSession;

    private static final String namespace = "com.midas.mapper.Team_userMapper";

    @Override
    public void insertTeam(Team_userVO vo){
        sqlSession.insert(namespace+".insertTeam",vo);
    }

    @Override
    public void deleteTeam_user(Team_userVO vo){sqlSession.delete(namespace+".deleteTeam_user",vo);}
}
