package com.xincheng.excelupload;

import com.xincheng.excelupload.model.ResultObject;
import com.xincheng.excelupload.service.UserService;
import io.github.biezhi.ome.OhMyEmail;
import io.github.biezhi.ome.SendMailException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;

import static io.github.biezhi.ome.OhMyEmail.SMTP_QQ;


/**
 * ClassName:ExcelUpload
 * Package:com.xincheng.excelupload
 * Description: excel文件上传
 *
 * @Date:2018/11/17 0:31
 * @Author: 郑军
 */
@Controller
public class ExcelUpload {

    private final static Logger LOGGER = LoggerFactory.getLogger(ExcelUpload.class);

    @Autowired
    private UserService userService;

    @RequestMapping("/excelUpload")
    @ResponseBody
    public void uploadExcel(@RequestParam("file")MultipartFile file,@RequestParam("upName") String upName ,
                                    @RequestParam("upEmail") String upEmail,@RequestParam("upMobile") String upMobile, HttpServletResponse response) {

        ResultObject resultObject = new ResultObject();
//        ResultObject resultObject = userService.uploadExcel(file);

        String content="客户: "+upName+" ,邮箱: "+upEmail+" ,电话: "+upMobile;
        System.err.println("content = " + content);
//        OhMyEmail.config(SMTP_QQ(true), "1218800603@qq.com", "qtfiiexukgdyhgjf");
//        try {
//            File toFile = multipartFileToFile(file);
//            OhMyEmail.subject("官网询价邮件")
//                    .from("客户邮箱")
//                    .to("849319996@qq.com")
//                    .html("<h1 font=red>信件内容</h1>")
//                    .attach(toFile, file.getOriginalFilename())
//                    .send();
//
//
////            delteTempFile(toFile);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

//        http://elektronikasales.com/images/
    }

    @RequestMapping("/download")
    public void downloadFile(HttpServletResponse response) throws IOException {
        try {
            Resource resource = new ClassPathResource("巴西.xlsx");
            File file = resource.getFile();
            String filename = resource.getFilename();
            InputStream inputStream = new FileInputStream(file);
            //强制下载不打开
            response.setContentType("application/force-download");
            OutputStream out = response.getOutputStream();
            //使用URLEncoder来防止文件名乱码或者读取错误
            response.setHeader("Content-Disposition", "attachment; filename="+ URLEncoder.encode(filename, "UTF-8"));
            int b = 0;
            byte[] buffer = new byte[1000000];
            while (b != -1) {
                b = inputStream.read(buffer);
                if(b!=-1) out.write(buffer, 0, b);
            }
            inputStream.close();
            out.close();
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * MultipartFile 转 File
     *
     * @param file
     * @throws Exception
     */
    public static File multipartFileToFile(MultipartFile file) throws Exception {

        File toFile = null;
        if (file.equals("") || file.getSize() <= 0) {
            file = null;
        } else {
            InputStream ins = null;
            ins = file.getInputStream();
            toFile = new File(file.getOriginalFilename());
            inputStreamToFile(ins, toFile);
            ins.close();
        }
        return toFile;
    }

    //获取流文件
    private static void inputStreamToFile(InputStream ins, File file) {
        try {
            OutputStream os = new FileOutputStream(file);
            int bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            os.close();
            ins.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 删除本地临时文件
     * @param file
     */
    public static void delteTempFile(File file) {
        if (file != null) {
            File del = new File(file.toURI());
            del.delete();
        }

    }

}
