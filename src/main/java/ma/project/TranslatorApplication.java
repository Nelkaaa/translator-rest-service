package ma.project;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("api")
public class TranslatorApplication extends Application {
    // This registers the REST application under /api
}

