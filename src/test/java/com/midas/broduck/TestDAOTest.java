package com.midas.broduck;

import com.midas.domain.ListVO;
import com.midas.domain.TeamVO;
import com.midas.domain.Team_userVO;
import com.midas.domain.TestVO;
import com.midas.persistence.*;
import com.midas.service.ListService;
import com.sun.xml.internal.ws.api.message.ExceptionHasMessage;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;

/**
 * Created by broduck on 2016. 5. 27..
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
        locations = {"file:src/main/webapp/WEB-INF/spring/**/*.xml"})


public class TestDAOTest {

    @Inject
    private ListService service;

    @Test
    public void testInsert() throws  Exception{
        ListVO vo = new ListVO();

        vo.setUid(4);
        vo.setList_name("testtest");
        vo.setLocation("tesdsada");
        vo.setMemo("hi");

        service.registList(vo);
    }

    /*@Test
    public void testInsert() throws Exception {
        TestVO vo = new TestVO();
        vo.setName("test144");
        vo.setPassword("test111");

        dao.insertTest(vo);
    }

    @Test
    public void testSelect() throws Exception {
        String name = "test123";

        dao.readTest(name);
    }

    @Test
    public void testUpdate() throws Exception {
        String name = "test";
        String sname = "test144";

        dao.updateTest(sname, name);
    }

    @Test
    public void testDelete() throws Exception {
        String name = "test123";

        dao.deleteTest(name);
    }*/
}
