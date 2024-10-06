package com.slsolution.plms.config;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.apache.catalina.connector.Connector;
import org.apache.coyote.ajp.AbstractAjpProtocol;
import org.apache.coyote.ajp.AjpNioProtocol;
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
	public TomcatServletWebServerFactory servletContainer() throws UnknownHostException {
		TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
		tomcat.addAdditionalTomcatConnectors(createAjpConnector());
		
		System.out.println("servletcontainer activate...");
		
		return tomcat;
	}
	
	private Connector createAjpConnector() throws UnknownHostException {
		Connector ajpConnector = new Connector(ajpProtocol);
		
		ajpConnector.setPort(ajpPort);
		ajpConnector.setSecure(true);
		ajpConnector.setAllowTrace(false);
		ajpConnector.setScheme("https");
		ajpConnector.setRedirectPort(8443);
		
		AjpNioProtocol protocol = (AjpNioProtocol)ajpConnector.getProtocolHandler();
		
		protocol.setSecret(null);
		protocol.setSecretRequired(false);
		protocol.setAddress(InetAddress.getByName("0.0.0.0"));
		
		return ajpConnector;
	}

}
