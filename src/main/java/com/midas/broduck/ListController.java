package com.midas.broduck;

import com.midas.domain.JsonVO;
import com.midas.domain.ListVO;
import com.midas.service.ListService;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by broduck on 2016. 5. 28..
 */

@Controller
@RequestMapping("/list")
public class ListController {

    @Inject
    private ListService service;

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(ListController.class);

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<String> registPOST(@RequestBody JsonVO vo) throws Exception {

        ResponseEntity<String> entity;

        try {

            ListVO listVO = new ListVO();

            listVO.setLid(vo.getLid());
            listVO.setUid(vo.getUid());
            listVO.setTid(vo.getTid());
            listVO.setList_name(vo.getTitle());
            listVO.setStart_time(vo.getStart());
            listVO.setEnd_time(vo.getEnd());
            listVO.setPrivacy(vo.getType());

            service.registList(listVO);
            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);

        } catch (Exception e) {

            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);

        }

        return entity;
    }

    @RequestMapping(value = "/modify", method = RequestMethod.POST)
    public ResponseEntity<String> modifyPOST(@RequestBody JsonVO vo) throws Exception {

        ResponseEntity<String> entity;

        try {
            ListVO listVO = new ListVO();

            listVO.setLid(vo.getLid());
            listVO.setUid(vo.getUid());
            listVO.setTid(vo.getTid());
            listVO.setList_name(vo.getTitle());
            listVO.setStart_time(vo.getStart());
            listVO.setEnd_time(vo.getEnd());
            listVO.setPrivacy(vo.getType());

            service.modifyList(listVO);

            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);

        } catch (Exception e) {

            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);

        }

        return entity;
    }

    @RequestMapping(value = "/{lid}", method = RequestMethod.DELETE)
    public ResponseEntity<String> removePOST(@PathVariable("lid") int lid) throws Exception {

        ResponseEntity<String> entity;

        try {

            service.removeList(lid);
            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);

        } catch (Exception e) {

            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);

        }

        return entity;
    }
}
