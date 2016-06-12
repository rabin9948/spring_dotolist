package com.midas.persistence;

import com.midas.domain.UserVO;
import com.midas.dto.LoginDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by broduck on 2016. 5. 28..
 */

@Repository
public class UserDAOImpl implements UserDAO {

    @Inject
    private SqlSession session;

    private static String namespace = "com.midas.mapper.UserMapper";

    @Override
    public UserVO login(LoginDTO dto) throws Exception {
        return session.selectOne(namespace + ".login", dto);
    }

    @Override
    public void keepLogin(String id, String sessionId, Date next) throws Exception {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("id", id);
        paramMap.put("sessionId", sessionId);
        paramMap.put("next", next);

        session.update(namespace + ".keepLogin", paramMap);
    }

    @Override
    public UserVO checkUserWithSessionKey(String value) throws Exception {
        return session.selectOne(namespace + ".checkUserWithSessionKey", value);
    }

    @Override
    public int checkUser(LoginDTO dto) throws Exception {
        return session.selectOne(namespace + ".loginCheck", dto);
    }

    @Override
    public void newMember(UserVO vo){
        session.insert(namespace+".newMember",vo);
    }

    @Override
    public int idCheck(UserVO vo){
        return session.selectOne(namespace+".idCheck",vo);
    }

    @Override
    public void upMember(UserVO vo){ session.update(namespace+".upMember",vo);}

    @Override
    public UserVO re_user(UserVO vo){return session.selectOne(namespace+".re_user",vo);}
}
