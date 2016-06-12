package com.midas.persistence;

import com.midas.domain.ClassVO;
import com.midas.domain.UserClassVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by broduck on 2016. 5. 28..
 */

@Repository
public class ClassDAOImpl implements ClassDAO {

    @Inject
    private SqlSession session;

    private static String namespace = "com.midas.mapper.ClassMapper";

    @Override
    public void createClass(UserClassVO vo) throws Exception {
        session.insert(namespace + ".createClass", vo);
    }

    @Override
    public List<ClassVO> readAllClass(int uid) throws Exception {
        return session.selectList(namespace + ".readAllClass", uid);
    }

    @Override
    public void deleteClass(UserClassVO vo) throws Exception {
        session.delete(namespace + ".deleteClass", vo);
    }
}
