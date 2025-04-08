import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class LogSplitter {
    public List<String> splitFile(String inputFile, int partSize) throws IOException {
        File file = new File(inputFile);
        BufferedReader reader = new BufferedReader(new FileReader(file));
        String line;
        int partCount = 0;
        List<String> partFiles = new ArrayList<>();
        List<String> partLines = new ArrayList<>();

        while ((line = reader.readLine()) != null) {
            partLines.add(line);
            if (partLines.size() >= partSize) {
                String partFile = savePart(partLines, partCount);
                partFiles.add(partFile);
                partCount++;
                partLines.clear();
            }
        }

        if (!partLines.isEmpty()) {
            String partFile = savePart(partLines, partCount);
            partFiles.add(partFile);
        }

        reader.close();
        return partFiles;
    }

    private String savePart(List<String> partLines, int partCount) throws IOException {
        String partFileName = "part_" + partCount + ".txt";
        FileWriter writer = new FileWriter(partFileName);
        for (String line : partLines) {
            writer.write(line + System.lineSeparator());
        }
        writer.close();
        return partFileName;
    }
}
