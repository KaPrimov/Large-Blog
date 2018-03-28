package com.kalin.large.api;

import freemarker.template.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
/**
 * <p>Export application.yml file to JavaScript file. The structure and the content of the resulting JavaScript file is
 * built by /resources/mail-tempplates/config/configuration.ftl template.</p>
 *
 * <p>The access to YML properties from FTL file can done by:
 * <code>getProperties("property.full.path")</code></p>
 */
@Controller
public class ConfigurationController {
    private static final String JS_CONFIGURATION_TEMPLATE = "ui-application-configuration.ftl";
    private static Logger logger = LoggerFactory.getLogger(ConfigurationController.class);

    private final Configuration freemarkerConfiguration;

    private final Environment environment;

    @Autowired
    public ConfigurationController(Configuration freemarkerConfiguration, Environment environment) {
        this.freemarkerConfiguration = freemarkerConfiguration;
        this.environment = environment;
    }

    @RequestMapping(value = "/configuration.js", method = RequestMethod.GET, produces = "application/javascript; charset=utf-8")
    public @ResponseBody
    String exportConfiguration() {
        return getFreeMarkerTemplateContent(environment, JS_CONFIGURATION_TEMPLATE);
    }

    /**
     * Get free marker template content
     * @param model {@link Environment}
     * @param template String
     * @return String
     */
    private String getFreeMarkerTemplateContent(final Environment model, final String template) {
        try {
            return FreeMarkerTemplateUtils.processTemplateIntoString(freemarkerConfiguration.getTemplate(template), model);
        } catch(Exception e) {
            logger.error("Exception occurred while processing FreeMaker template:" + e.getMessage(), e);
        }

        return "";
    }
}
