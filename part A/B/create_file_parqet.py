import pandas as pd
import numpy as np
from datetime import datetime


# קובץ Parquet---------------------------------------------

n = 10

# שעה קבועה
fixed_time = datetime(2024, 4, 1, 11, 0)

# יצירת רשומות עם אותה שעה עבור כל הערכים
timestamps = [fixed_time] * n

data = {
    "timestamp": timestamps,
    "value": np.random.randint(10, 100, size=10)
}

df = pd.DataFrame(data)

# שמירת הנתונים כ-Parquet
df.to_parquet("time_series2.parquet", engine="pyarrow", index=False)

print("✅ קובץ Parquet חדש נוצר בהצלחה.")


# קובץ csv----------------------------------------------

# n = 10

# # שעה קבועה
# fixed_time = datetime(2024, 4, 1, 12, 0)

# # יצירת רשומות עם אותה שעה עבור כל הערכים
# timestamps = [fixed_time] * n

# data = {
#     "timestamp": timestamps,
#     "value": np.random.randint(10, 100, size=10)
# }

# df = pd.DataFrame(data)

# # שמירת הנתונים כ-Parquet
# df.to_csv("time_series2.csv", index=False)

# print("✅ קובץ csv חדש נוצר בהצלחה.")
