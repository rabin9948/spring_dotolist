package com.midas.broduck;

import com.midas.domain.ClassVO;
import com.midas.domain.ListVO;
import com.midas.domain.UserVO;
import com.midas.service.ClassService;
import com.midas.service.ListService;
//import com.sun.tools.internal.xjc.reader.xmlschema.bindinfo.BIConversion;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import java.text.DateFormat;
import java.util.*;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	@Inject
	ClassService classService;

	@Inject
	ListService listService;
	
	private static final org.slf4j.Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, HttpSession session) {
		logger.info("Welcome home! The client locale is {}.", locale);

		UserVO vo = null;

		if (session.getAttribute("login") != null) {
			vo = (UserVO) session.getAttribute("login");

			logger.info(vo.getId());
		}

		model.addAttribute("userVO", vo);

		return "selectable2";
	}

	@RequestMapping(value = "/{uid}", method = RequestMethod.POST)
	public ResponseEntity<ArrayList<Map<String, Object>>> readAllList(@PathVariable("uid") int uid) throws Exception {

		ResponseEntity<ArrayList<Map<String, Object>>> entity;

		try {

			ArrayList<Map<String, Object>> arrayList = new ArrayList<>();
			List<ClassVO> classList = classService.listClass(uid);
			List<ListVO> listList = listService.readList(uid);

			for (ClassVO item : classList) {
				HashMap<String, Object> hashMap = new HashMap<>();

				hashMap.put("cid", item.getCid());
				hashMap.put("className", item.getClassroom());
				hashMap.put("title", item.getClass_name());
				hashMap.put("start", item.getStart_time());
				hashMap.put("end", item.getEnd_time());
				hashMap.put("type", item.getTerm());
				hashMap.put("day", item.getDay());

				arrayList.add(hashMap);
			}

			for (ListVO item : listList) {
				HashMap<String, Object> hashMap = new HashMap<>();
				hashMap.put("lid", item.getLid());
				hashMap.put("uid", item.getUid());
				hashMap.put("tid", item.getTid());
				hashMap.put("className", "class" + item.getLid());
				hashMap.put("title", item.getList_name());
				hashMap.put("start", item.getStart_time());
				hashMap.put("end", item.getEnd_time());
				hashMap.put("type", item.getPrivacy());

				arrayList.add(hashMap);
			}

			entity = new ResponseEntity<>(arrayList, HttpStatus.OK);

		} catch (Exception e) {

			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	
}
