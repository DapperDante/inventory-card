DROP PROCEDURE IF EXISTS add_user;

DELIMITER //
CREATE PROCEDURE add_user(in in_username VARCHAR(65), in in_email VARCHAR(150), in in_password VARCHAR(255))
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'User added';
  DECLARE error_code INT;
  DECLARE result_json JSON;

  -- Duplicate data
  DECLARE CONTINUE HANDLER FOR 1062
  BEGIN 
    SET message = 'User already exists';
    SET error_code = 1062;
    SET result_json = NULL;
    ROLLBACK;
  END;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN 
    SET message = 'An error occurred while adding the user';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  INSERT INTO users(email, username, password) 
  VALUES(in_email, in_username, in_password);
  
  IF error_code IS NULL THEN 
    SET result_json = JSON_OBJECT(
      'id', LAST_INSERT_ID()
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
