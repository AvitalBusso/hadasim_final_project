import pandas as pd
import os

def validate_and_clean_data(df):
    required_columns = {"timestamp", "value"}
    if not required_columns.issubset(df.columns):
        raise ValueError("Missing required columns: 'timestamp' and 'value'")

    if df['timestamp'].isnull().any() or df['value'].isnull().any():
        raise ValueError("Missing values found in 'timestamp' or 'value' columns")

    try:
        pd.to_datetime(df["timestamp"])
    except Exception:
        raise ValueError("Invalid datetime format in 'timestamp' column")

    if df.duplicated(subset=["timestamp", "value"]).any():
        raise ValueError("Duplicate rows with same timestamp and value detected")

def process_day_file(df):
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df["hour"] = df["timestamp"].dt.floor("H") 

    hourly_avg = df.groupby("hour")["value"].mean().reset_index()
    hourly_avg.columns = ["Start time", "average"]
    return hourly_avg

def split_by_day_and_process(input_file):
    file_extension = os.path.splitext(input_file)[-1].lower()

    if file_extension == ".csv":
        df = pd.read_csv(input_file) 
    elif file_extension == ".parquet":
        df = pd.read_parquet(input_file, engine="pyarrow")  
    else:
        raise ValueError("Unsupported file format. Please use CSV or Parquet.") 
    validate_and_clean_data(df)
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df["date"] = df["timestamp"].dt.date 

    results = []
    for date, group in df.groupby("date"):
        daily_avg = process_day_file(group)
        results.append(daily_avg)
    final_result = pd.concat(results).sort_values("Start time")
    return final_result

def process_large_file(input_file, output_file):
    final_df = split_by_day_and_process(input_file)
    final_df.to_csv(output_file, index=False)

process_large_file("time_series2.parquet", "final_hourly_averages.csv")