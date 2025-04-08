CREATE DATABASE FamilyDB;

go

CREATE TABLE People (
    Person_Id INT PRIMARY KEY,
    Personal_Name VARCHAR(50),
    Family_Name VARCHAR(50),
    Gender CHAR(1) CHECK (Gender IN ('M', 'F')) not null,
    Father_Id INT FOREIGN KEY REFERENCES People(Person_Id),
    Mother_Id INT FOREIGN KEY REFERENCES People(Person_Id),
    Spouse_Id INT FOREIGN KEY REFERENCES People(Person_Id),
);

CREATE TABLE FamilyTree (
    Person_Id INT FOREIGN KEY REFERENCES People(Person_Id),
    Relative_Id INT FOREIGN KEY REFERENCES People(Person_Id),
    Connection_Type VARCHAR(10) CHECK (Connection_Type IN ('���', '���', '��', '��', '��', '����', '�� ���','�� ���')),
    PRIMARY KEY (Person_Id, Relative_Id),
);

 insert into [dbo].[People]([Person_Id],[Personal_Name],[Family_Name],[Gender])
 values('111111111','Uriel','Busso','M')
 insert into [dbo].[People]([Person_Id],[Personal_Name],[Family_Name],[Gender],[Spouse_Id])
 values('222222222','Nechama','Busso','F','111111111')
 insert into [dbo].[People]([Person_Id],[Personal_Name],[Family_Name],[Gender],[Mother_Id],[Father_Id])
 values('333333333','Avital','Busso','F','222222222','111111111')

  --------�� �� ���� ���� �������-------

 --����� �� ���� ������� ����� ����� ����� �� ��� �����--
 select * from [dbo].[People]
 select * from [dbo].[FamilyTree]

 --���� �� ����� �������� 1 ��� ���� �� ������ ����--PopulateFamilyTree
 EXEC PopulateFamilyTree;

 --����� �� ������� �� ���� ���� ���� ����--
 select * from [dbo].[People] --��� �� ����� ����
 select * from [dbo].[FamilyTree] --���� ����� �����

 --���� �� ����� �������� 2 ��� ���� �� ������ ����--CompleteSpouseReferences
 EXEC CompleteSpouseReferences;

 --����� �� ������� �� ���� ���� ���� ���� ����� �� ������ �-2 �������--
 select * from [dbo].[People] 
 select * from [dbo].[FamilyTree]


 --����� ������ ���� �� ������� ������ ������ ������� �����--
 TRUNCATE TABLE [dbo].[FamilyTree]
 DELETE FROM People;