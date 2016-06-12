package com.midas.persistence;

import com.midas.domain.TestVO;
import org.apache.ibatis.io.ResolverUtil;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by broduck on 2016. 5. 27..
 */

@Repository
public class TestDAOImpl implements TestDAO {

    @Inject
    private SqlSession sqlSession;

    private static final String namespace = "com.midas.mapper.TestMapper";

    @Override
    public String getTime() {
        return sqlSession.selectOne(namespace + ".getTime");
    }

    @Override
    public void insertTest(TestVO vo) {
        sqlSession.insert(namespace + ".insertTest", vo);
    }

    @Override
    public TestVO readTest(String name) throws Exception {
        return (TestVO) sqlSession.selectOne(namespace + ".readTest", name);
    }

    @Override
    public void updateTest(String sname, String name) throws Exception {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("sname", sname);
        paramMap.put("name", name);

        sqlSession.update(namespace + ".updateTest", paramMap);
    }

    @Override
    public void deleteTest(String name) throws Exception {
        sqlSession.delete(namespace + ".deleteTest", name);
    }
}
