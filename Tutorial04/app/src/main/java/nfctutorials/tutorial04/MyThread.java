package nfctutorials.tutorial04;

import org.jsoup.Jsoup;

import java.io.IOException;

/**
 * Created by Piumi on 2016-11-27.
 */

public class MyThread implements Runnable {
    String tagContent;

    public MyThread(String id) {
        this.tagContent = id;
    }

    public void run() {
        try {

            Jsoup.connect("http://172.31.4.58:2406/sendID").data("id", tagContent).post();

        }
        catch(IOException e){
            System.out.println(e);
        }
    }
}
