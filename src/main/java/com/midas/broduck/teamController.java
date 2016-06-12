package com.midas.broduck;

import com.midas.domain.UserVO;
import com.midas.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;

/**
 * Created by tak on 2016-05-28.
 */
@Controller
@RequestMapping("/team")
public class teamController {
    @Inject
    private UserService service;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public void newSign(@ModelAttribute("vo") UserVO vo) {

    }

}
