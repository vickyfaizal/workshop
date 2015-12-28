package org.meruvian.yama.webapi.interceptor;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.ServletContext;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.ext.Provider;

import org.jboss.resteasy.spi.ResteasyProviderFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.stereotype.Component;

@Component
@Provider
@ConditionalOnWebApplication
public class ServletContextFilter implements ContainerRequestFilter {
	@Inject
	private ServletContext servletContext;
	
	@Override
	public void filter(ContainerRequestContext requestContext)
			throws IOException {
		ResteasyProviderFactory.getContextDataMap().put(ServletContext.class, servletContext);
	}

}
