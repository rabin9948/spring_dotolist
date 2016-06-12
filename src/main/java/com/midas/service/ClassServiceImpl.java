package com.midas.service;

import com.midas.domain.ClassVO;
import com.midas.domain.UserClassVO;
import com.midas.persistence.ClassDAO;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.lang.Exception;import java.lang.Override;import java.util.List;

/**
 * Created by broduck on 2016. 5. 28..
 */

@Service
public class ClassServiceImpl implements ClassService {

    @Inject
    private ClassDAO dao;

    @Override
    public void insertClass(UserClassVO vo) throws Exception {
        dao.createClass(vo);
    }

    @Override
    public List<ClassVO> listClass(int uid) throws Exception {
        return dao.readAllClass(uid);
    }

    @Override
    public void removeClass(UserClassVO vo) throws Exception {
        dao.deleteClass(vo);
    }
}
