package com.midas.persistence;

import com.midas.domain.UserVO;
import com.midas.dto.LoginDTO;

import java.util.Date;

/**
 * Created by broduck on 2016. 5. 28..
 */
public interface UserDAO {

    public UserVO login(LoginDTO dto) throws Exception;

    public void keepLogin(String id, String sessionId, Date next) throws Exception;

    public UserVO checkUserWithSessionKey(String value) throws Exception;

    public int checkUser(LoginDTO dto) throws Exception;

    public void newMember(UserVO vo);

    public int idCheck(UserVO vo);

    public void upMember(UserVO vo);

    public UserVO re_user(UserVO vo);
}
