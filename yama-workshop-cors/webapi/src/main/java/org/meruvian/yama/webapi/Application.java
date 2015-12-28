/**
 * Copyright 2014 Meruvian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.meruvian.yama.webapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.social.SocialWebAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author Dian Aditya
 *
 */
@SpringBootApplication
@EnableAutoConfiguration(exclude = { SocialWebAutoConfiguration.class })
@ComponentScan({ "org.meruvian.yama" })
public class Application {
	public static final String PROFILE_DEV = "dev";
	public static final String PROFILE_PROD = "prod";
	public static final String PROFILE_WEB = "web";
	
	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(Application.class);
		application.setShowBanner(false);
		
		application.run(args);
	}
}
