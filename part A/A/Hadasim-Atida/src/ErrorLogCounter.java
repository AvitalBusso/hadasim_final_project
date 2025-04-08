import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

public class ErrorLogCounter {
    private HashMap<String, Integer> errorCounts = new HashMap<>();

    public HashMap<String, Integer> getErrorCounts() {
        return errorCounts;
    }

    private String extractErrorCode(String logLine) {
        String prefix = "Error: ";
        int startIndex = logLine.indexOf(prefix);
        if (startIndex != -1) {

            int startCodeIndex = startIndex + prefix.length();
            int endCodeIndex = logLine.indexOf(" ", startCodeIndex);
            if (endCodeIndex == -1) {
                endCodeIndex = logLine.length();
            }
            return logLine.substring(startCodeIndex, endCodeIndex);
        }
        return "Unknown";
    }

    public void reset() {
        this.errorCounts.clear();
    }

    public void processFile(String filePath) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String errorCode = extractErrorCode(line);
                if (errorCode != null) {
                    errorCounts.put(errorCode, errorCounts.getOrDefault(errorCode, 0) + 1);
                }
            }
        }
    }

}
