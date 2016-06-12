package com.midas.service;

import com.midas.domain.ListVO;

import java.lang.Exception;import java.util.List;

/**
 * Created by broduck on 2016. 5. 28..
 */
public interface ListService {

    public List<ListVO> readList(int uid) throws Exception;

    public void registList(ListVO vo) throws Exception;

    public void modifyList(ListVO vo) throws Exception;

    public void removeList(int lid) throws Exception;
}
