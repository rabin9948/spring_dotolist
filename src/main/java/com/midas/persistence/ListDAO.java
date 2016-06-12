package com.midas.persistence;

import com.midas.domain.ListVO;

import java.util.List;

/**
 * Created by broduck on 2016. 5. 28..
 */
public interface ListDAO {

    public List<ListVO> readAllList(int uid) throws Exception;

    public void createList(ListVO vo) throws Exception;

    public void updateList(ListVO vo) throws Exception;

    public void deleteList(int lid) throws Exception;
}
