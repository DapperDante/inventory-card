DROP PROCEDURE IF EXISTS add_user_to_company;

DELIMITER //
CREATE PROCEDURE add_user_to_company(in in_user_id INT, in in_company_id INT)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'User added to company';
  DECLARE error_code INT;
  DECLARE result_json JSON;

  -- Duplicate data
  DECLARE CONTINUE HANDLER FOR 1062
  BEGIN 
    SET message = 'User already exists in company';
    SET error_code = 1062;
    SET result_json = NULL;
    ROLLBACK;
  END;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN 
    SET message = 'An error occurred while adding the user to the company';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  INSERT INTO users_companies(user_id, company_id)
  VALUES(in_user_id, in_company_id);

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
