package com.slsolution.plms.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@MapperScan(basePackages="com.slsolution.plms.dao")
@EnableTransactionManagement
public class DatabaseConfig {

	
	 @Bean
	    public  SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
	        final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
	        sessionFactory.setDataSource(dataSource);
	        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
	        //sessionFactory.setConfigLocation(applicationContext.getResource("classpath:mybatis-config.xml"));
	        //sessionFactory.setConfigLocation(new ClassPathResource("mybatis-config.xml"));
	        sessionFactory.setConfigLocation(resolver.getResource("classpath:mybatis-config.xml"));
	        sessionFactory.setMapperLocations(resolver.getResources("classpath:mapper/*.xml"));
	       // sessionFactory.setConfigLocation(resolver.getResources("classpath:mybatis-config.xml"));
	       // sessionFactory.setC
	       
	        return sessionFactory.getObject();
	    }
	    
	    @Bean
	    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) throws Exception {
	      final SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory);
	      return sqlSessionTemplate;
	    }
}
