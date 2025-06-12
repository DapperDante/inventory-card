DROP PROCEDURE IF EXISTS add_company;

DELIMITER //
CREATE PROCEDURE add_company(in in_user_id INT, in in_name VARCHAR(150))
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Company added';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE new_company_id INT;

  DECLARE CONTINUE HANDLER FOR NOT FOUND
  BEGIN
    SET message = 'Company not found';
    SET error_code = 1329;
  END;

  DECLARE CONTINUE HANDLER FOR 1062
  BEGIN 
    SET message = 'Company already exists';
    SET error_code = 1062;
    SET result_json = NULL;
    ROLLBACK;
  END;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN 
    SET message = 'An error occurred while adding the company';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  INSERT INTO companies(name) 
  VALUES(in_name);

  SET new_company_id = LAST_INSERT_ID();

  CALL add_user_to_company(in_user_id, new_company_id);
  
  IF error_code IS NULL THEN 
    SET result_json = JSON_OBJECT(
      'id', new_company_id
    ); 
  END IF;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
