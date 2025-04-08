import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ErrorMerger {
    public Map<String, Integer> mergeErrorCounts(List<Map<String, Integer>> allCounts) {
        Map<String, Integer> mergedCounts = new HashMap<>();

        for (Map<String, Integer> counts : allCounts) {
            for (Map.Entry<String, Integer> entry : counts.entrySet()) {
                mergedCounts.put(entry.getKey(), mergedCounts.getOrDefault(entry.getKey(), 0) + entry.getValue());
            }
        }

        return mergedCounts;
    }
}
