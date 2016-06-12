package com.midas.persistence;

import com.midas.domain.ClassVO;
import com.midas.domain.UserClassVO;

import java.util.List;
import java.util.Map;

/**
 * Created by broduck on 2016. 5. 28..
 */
public interface ClassDAO {

    public void createClass(UserClassVO vo) throws Exception;

    public List<ClassVO> readAllClass(int uid) throws Exception;

    public void deleteClass(UserClassVO vo) throws Exception;
}
