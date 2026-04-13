package ma.project;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.Map;

@Path("translator")
@RolesAllowed("user")
public class TranslatorResource {

    private static final String API_KEY = "AIzaSyDnweFQdjemHmv-0ca04DN2o0DFqFvSUZU";

    @POST
    @Path("translate")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, String> translate(Map<String, String> req) {

        String text = req.get("text");
        String targetLanguage = req.getOrDefault("targetLanguage", "Moroccan Arabic Darija");

        try {
            Client client = Client.builder().apiKey(API_KEY).build();

            GenerateContentResponse response = client.models.generateContent(
                    "gemini-flash-lite-latest",
                    "You are a translator. Translate the following text to " + targetLanguage +
                            ". Return only the translated text written in the " + targetLanguage +
                            " script (i.e. characters): " + text,
                    null
            );

            return Map.of("translation", response.text());

        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }
}