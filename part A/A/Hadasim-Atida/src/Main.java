import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        try {

            LogSplitter splitter = new LogSplitter();
            ErrorLogCounter counter = new ErrorLogCounter();
            ErrorMerger merger = new ErrorMerger();

            List<String> PartFiles = splitter.splitFile("logs.txt", 1000);

            List<Map<String, Integer>> allErrorCounts = new ArrayList<>();
            for (String PartFile : PartFiles) {
                counter.reset();
                counter.processFile(PartFile);
                allErrorCounts.add(counter.getErrorCounts());
            }

            Map<String, Integer> mergedErrorCounts = merger.mergeErrorCounts(allErrorCounts);

            int n = getValidInput(in);

            List<Map.Entry<String, Integer>> sortedErrors = new ArrayList<>(mergedErrorCounts.entrySet());
            sortedErrors.sort((e1, e2) -> e2.getValue().compareTo(e1.getValue()));

            for (int i = 0; i < n && i < sortedErrors.size(); i++) {
                System.out.println(sortedErrors.get(i).getKey() + ": " + sortedErrors.get(i).getValue());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static int getValidInput(Scanner in) {
        int n;
        while (true) {
            System.out.println("Enter a positive integer: ");
            if (in.hasNextInt()) {
                n = in.nextInt();
                if (n > 0) {
                    return n;
                } else {
                    System.out.println("Please enter a positive integer greater than 0.");
                }
            } else {
                System.out.println("That's not a valid number. \nPlease enter an integer.");
                in.next();
            }
        }
    }
}
