package com.evanshortiss.helloworld.greeting;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.apache.log4j.Logger;

@RestController
public class GreetingController {

    @Autowired
    private GreetingProperties properties;
    private final AtomicLong counter = new AtomicLong();
    final static Logger logger = Logger.getLogger("Greeing API");

    @RequestMapping("/api/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        long count = counter.incrementAndGet();
        logger.debug("greeting endpoint call #" + count + " with name \"" + name + "\"");
        return new Greeting(count, String.format(properties.getMessage(), name));
    }
}
