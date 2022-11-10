package data.controller;

import data.dto.ChatMessageDto;
import data.dto.ChatRoomDto;
import data.dto.UserDto;
import data.mapper.ChatMessageMapper;
import data.mapper.ChatRoomMapper;
import data.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import util.FileUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class ChatMessageController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    ChatMessageMapper cmmapper;
    @Autowired
    UserMapper umapper;
    String uploadFileName;
    @MessageMapping("/chat")
    public void sendMessage(ChatMessageDto chatDto, SimpMessageHeaderAccessor accessor) {
        //System.out.println(chatDto.getSender()+chatDto.getMsg());
        int cm_num=cmmapper.insertChatMessage(chatDto);
        //System.out.println(cm_num);
        //ChatMessageDto sendDto=cmmapper.getMsg(cm_num);
        chatDto.setCm_num(cm_num);
        //System.out.println(sendDto.getCm_wdate());
        //chatDto.setCm_wdate(sendDto.getCm_wdate());
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getCr_num(), chatDto);
    }

    @GetMapping("/chat/cm")
    public List<ChatMessageDto> getChatMessage(int cr_num){
        return cmmapper.getChatMessage(cr_num);
    }

    @GetMapping("/chat/read")
    public void updateRead(int cr_num, int ur_num){
        int sender=cmmapper.getSender(cr_num);
        //System.out.println("----------------------------");
        //System.out.println("ur_num"+ur_num);
        //System.out.println("sender"+sender);
        if(ur_num!=sender){
            Map<String,Integer> map=new HashMap<>();
            map.put("cr_num",cr_num);
            map.put("sender",sender);
            cmmapper.updateRead(map);
        }
    }
    @PostMapping("/photo/upload")
    public String imgupload(@RequestParam MultipartFile uploadFile, HttpServletRequest request)
    {
        System.out.println("React로 부터 이미지 업로드");
        //업로드할 폴더 구하기
        String path=request.getSession().getServletContext().getRealPath("/image");
        System.out.println(path);

        //이전 업로드한 사진을 지훈 후 현재 사진 업로드하기
        uploadFileName=FileUtil.getChangeFileName(uploadFile.getOriginalFilename());
        try {
            uploadFile.transferTo(new File(path+"/"+uploadFileName));
            System.out.println("업로드 성공");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return "img-"+uploadFileName;
    }

    @GetMapping("/chat/u_info")
    public UserDto getUserdataByUr(int u_num)
    {
        return umapper.getUserdataByUr(u_num);
    }
}