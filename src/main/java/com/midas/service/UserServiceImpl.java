package com.midas.service;

import com.midas.domain.UserVO;
import com.midas.dto.LoginDTO;
import com.midas.persistence.UserDAO;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Date;

/**
 * Created by broduck on 2016. 5. 28..
 */

@Service
public class UserServiceImpl implements UserService {

    @Inject
    private UserDAO dao;

    @Override
    public UserVO login(LoginDTO dto) throws Exception {
        return dao.login(dto);
    }

    @Override
    public void keepLogin(String id, String sessionId, Date next) throws Exception {
        dao.keepLogin(id, sessionId, next);
    }

    @Override
    public UserVO checkLoginBefore(String value) throws Exception{
        return dao.checkUserWithSessionKey(value);
    }

    @Override
    public int checkUser(LoginDTO dto) throws Exception {
        return dao.checkUser(dto);
    }

    @Override
    public void newMember(UserVO vo){
        dao.newMember(vo);
    }


    @Override
    public int idCheck(UserVO vo){
        return dao.idCheck(vo);
    }

    @Override
    public void upMember(UserVO vo){dao.upMember(vo);}

    @Override
    public UserVO re_user(UserVO vo){
        return dao.re_user(vo);
    }
}
