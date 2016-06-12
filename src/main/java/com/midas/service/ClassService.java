package com.midas.service;

import com.midas.domain.ClassVO;
import com.midas.domain.UserClassVO;
import com.midas.persistence.ClassDAO;

import java.util.List;

/**
 * Created by broduck on 2016. 5. 28..
 */
public interface ClassService {

    public void insertClass(UserClassVO vo) throws Exception;

    public List<ClassVO> listClass(int uid) throws Exception;

    public void removeClass(UserClassVO vo) throws Exception;
}
