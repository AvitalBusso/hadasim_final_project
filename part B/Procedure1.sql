use [FamilyDB]
go

CREATE OR ALTER PROCEDURE PopulateFamilyTree
AS
BEGIN
    TRUNCATE TABLE FamilyTree;

    INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT Person_Id, Father_Id, 'אבא'
    FROM People
    WHERE Father_Id IS NOT NULL;

    INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT Person_Id, Mother_Id, 'אמא'
    FROM People
    WHERE Mother_Id IS NOT NULL;
	
    INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT Father_Id, Person_Id,
           CASE WHEN Gender = 'F' THEN 'בת' ELSE 'בן' END
    FROM People
    WHERE Father_Id IS NOT NULL;

    INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT Mother_Id, Person_Id,
           CASE WHEN Gender = 'F' THEN 'בת' ELSE 'בן' END
    FROM People
    WHERE Mother_Id IS NOT NULL;

    INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT Person_Id, Spouse_Id,
		  CASE WHEN Gender = 'F' THEN 'בן זוג' ELSE 'בת זוג' END
    FROM People
    WHERE Spouse_Id IS NOT NULL;

END;



