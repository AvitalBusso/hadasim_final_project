# Project Overview

This project is divided into four parts:

1. **File Handling and Error Code Frequency (Java)**
2. **SQL Processing**
3. **Electronics**
4. **Full Stack Project**

## Part A – File Handling and Error Code Frequency

This part is divided into two sections:

### Section A – Java Log Processor

In this task, a large `logs.txt` file containing millions of error codes is analyzed to find the **top N most frequent error codes**. The solution was implemented in **Java** and includes:

- Splitting the large log file into smaller chunks.
- Counting the frequency of each error code in every chunk.
- Merging the counts into a single map.
- Extracting the top N most frequent error codes.
- Time and space complexity analysis of the solution.

No external dependencies were used — only standard Java libraries (`java.io`, `java.util`).

### Section B – Python Time-Series Processor

This section processes a large **time series dataset** (`time_series.csv` or `time_series.parquet`) and computes **hourly averages**.

The implementation in **Python** uses the following libraries:

```python
import pandas as pd
import os
```

## Part B – SQL: Family Database and Relationships

In this part, we created a **Family Database** to model relationships using SQL. This includes the creation of the `People` and `FamilyTree` tables, inserting sample data, and writing stored procedures to populate family relationships.

### Instructions to Run

1. **Create the Database and Tables**  
   Run the SQL script in `Creating_and_running.sql` to create the `FamilyDB` database and the required tables:

2. the end in   `Creating_and_running.sql` file.


## Part C – Electronics: Air Conditioner Remote Control

This part involves the understanding of the operation of an **air conditioner remote control**, focusing on how the remote communicates with the air conditioner and how button presses are transmitted. The section includes:

- Explanation of the **transmission method** between the remote and the air conditioner.
- Breakdown of the **components** needed for the remote and the air conditioner.
- A discussion on how the air conditioner **"knows"** which button was pressed on the remote.

The responses are documented in the **answers.txt** file.


## Part D – Grocery Management System

In this section, we developed a **Grocery Management System** for a local store owner. The system is divided into two main parts:

### Server-Side (Java - Grocery Project)
- Developed using **Java** to handle the server-side functionality.
- The server allows the store owner to:
  - Place orders for goods from suppliers.
  - View the status of existing orders.
  - Confirm the receipt of orders and update their status to "Completed."
  - Maintain a database of all orders, including completed ones.

### Client-Side (React - GroceryProject)
- Developed using **React** for the client-side interface.
- Suppliers can:
  - Register as a new user or log in with existing credentials.
  - View the orders placed by the store owner.
  - Approve or update the status of orders.
  - Enter details such as company name, contact number, representative name, and list of products offered.

### Database (SQL - DBGrocery2)
- The database used is **DBGrocery2**, created with **SQL**.
- Accessible through **H2 Console** at `http://localhost:8080/h2-console` (only when the project is running).

### System Features:
- **Store Owner Login**: Uses password **Av123456** to access the system.
- **Supplier Login/Registration**: The example login credentials are **Company Name: Tech Solutions** and **Password: Password1234**.

The system is designed to streamline grocery orders, track their status, and make the process more efficient for both the store owner and suppliers.
