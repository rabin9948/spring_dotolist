package com.midas.persistence;

import com.midas.domain.TestVO;

/**
 * Created by broduck on 2016. 5. 27..
 */
public interface TestDAO {

    public String getTime();

    public void insertTest(TestVO vo);

    public TestVO readTest(String name) throws Exception;

    public void updateTest(String sname, String name) throws Exception;

    public void deleteTest(String name) throws Exception;
}
