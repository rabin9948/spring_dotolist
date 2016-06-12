package com.midas.broduck;

import com.midas.domain.ClassVO;
import com.midas.domain.JsonVO;
import com.midas.domain.UserClassVO;
import com.midas.service.ClassService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import javax.jws.soap.SOAPBinding;
import java.lang.Exception;import java.lang.String;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by broduck on 2016. 5. 28..
 */

@Controller
@RequestMapping("/class")

public class ClassController {

    @Inject
    private ClassService service;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<String> registerPOST(@RequestBody JsonVO vo) throws Exception {

        ResponseEntity<String> entity;

        try {
            UserClassVO userClassVO = new UserClassVO();
            userClassVO.setUid(vo.getUid());
            userClassVO.setCid(vo.getCid());

            service.insertClass(userClassVO);
            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);

        } catch (Exception e) {

            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return entity;
    }

    @RequestMapping(value = "/remove", method = RequestMethod.DELETE)
    public ResponseEntity<String> removePOST(@RequestBody JsonVO vo) throws Exception {

        ResponseEntity<String> entity;

        try {
            UserClassVO userClassVO = new UserClassVO();
            userClassVO.setCid(vo.getCid());
            userClassVO.setUid(vo.getUid());

            service.removeClass(userClassVO);
            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);

        } catch (Exception e) {

            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return entity;
    }
}
