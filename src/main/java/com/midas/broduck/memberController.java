package com.midas.broduck;

import com.midas.domain.UserVO;
import com.midas.dto.LoginDTO;
import com.midas.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

/**
 * Created by tak on 2016-05-28.
 */
@Controller
@RequestMapping("/signup")
public class memberController {
    @Inject
    private UserService service;

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
        public void newSign(@ModelAttribute("vo")UserVO vo) {

        }

        @RequestMapping(value = "/check", method = RequestMethod.POST)
        public String newMember(UserVO vo, Model model,RedirectAttributes rttr) {
            int count = 0;
            count = service.idCheck(vo);

            if(count == 0) {

                service.newMember(vo);
                rttr.addFlashAttribute("msg","success");
            }
        else{

            rttr.addFlashAttribute("msg","fail");
        }

        return "redirect:/user/login";
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public void updateMember(@ModelAttribute("vo")UserVO vo,Model model,HttpSession session){
        UserVO vo2=null;
        if((UserVO)session.getAttribute("login") != null){
            vo2 = (UserVO)session.getAttribute("login");
        }
        model.addAttribute("userVO", vo2);

    }

    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)
    public String upMember(UserVO vo, Model model,RedirectAttributes rttr,HttpSession session) {

        session.removeAttribute("login");
        service.upMember(vo);
        UserVO vo2 = service.re_user(vo);
        session.setAttribute("login",vo2);
        model.addAttribute("userVO", vo2);

        return "redirect:/";
    }
}
