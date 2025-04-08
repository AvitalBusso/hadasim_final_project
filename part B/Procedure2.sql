USE FamilyDB;
go 

CREATE OR ALTER PROCEDURE CompleteSpouseReferences
AS
BEGIN
    UPDATE p2
    SET p2.Spouse_Id = p1.Person_Id
    FROM People p1
    JOIN People p2 ON p1.Spouse_Id = p2.Person_Id
    WHERE p2.Spouse_Id IS NULL
      AND p1.Spouse_Id IS NOT NULL;

	INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT p1.Person_Id, p1.Spouse_Id,
           CASE WHEN p1.Gender = 'F' THEN 'בן זוג' ELSE 'בת זוג' END
    FROM People p1
    WHERE p1.Spouse_Id IS NOT NULL
      AND NOT EXISTS (
          SELECT 1
          FROM FamilyTree ft
          WHERE ft.Person_Id = p1.Person_Id
            AND ft.Relative_Id = p1.Spouse_Id
            AND ft.Connection_Type IN ('בן זוג', 'בת זוג')
      );

END;


