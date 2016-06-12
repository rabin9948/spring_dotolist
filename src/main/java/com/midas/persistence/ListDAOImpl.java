package com.midas.persistence;

import com.midas.domain.ListVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by broduck on 2016. 5. 28..
 */

@Repository
public class ListDAOImpl implements ListDAO {

    @Inject
    SqlSession session;

    private static final String namespace = "com.midas.mapper.ListMapper";

    @Override
    public List<ListVO> readAllList(int uid) throws Exception {
        return session.selectList(namespace + ".readAllList", uid);
    }

    @Override
    public void createList(ListVO vo) throws Exception {
        session.insert(namespace + ".createList", vo);
    }

    @Override
    public void updateList(ListVO vo) throws Exception {
        session.update(namespace + ".updateList", vo);
    }

    @Override
    public void deleteList(int lid) throws Exception {
        session.delete(namespace + ".deleteList", lid);
    }
}
