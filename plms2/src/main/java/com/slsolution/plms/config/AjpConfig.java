package com.slsolution.plms.config;

import org.apache.catalina.connector.Connector;
import org.apache.coyote.ajp.AbstractAjpProtocol;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AjpConfig {
	
	@Value("${tomcat.ajp.port}")
	int ajpPort;
	
	@Value("${tomcat.ajp.enabled}")
	boolean ajpEnabled;
	
	@Value("${tomcat.ajp.protocol}")
	String ajpProtocol;
	
	@Bean
	public TomcatServletWebServerFactory servletContainer() {
		TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
		
		if(ajpEnabled) {
			Connector ajpConnector = new Connector(ajpProtocol);
			
			ajpConnector.setPort(ajpPort);
			ajpConnector.setSecure(false);
			ajpConnector.setScheme("https");
			ajpConnector.setAllowTrace(false);
			
			((AbstractAjpProtocol)ajpConnector.getProtocolHandler()).setSecretRequired(false);
			
			tomcat.addAdditionalTomcatConnectors(ajpConnector);
			
		}
		
		return tomcat;
	}

}
