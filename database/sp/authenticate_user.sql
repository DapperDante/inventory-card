DROP PROCEDURE IF EXISTS authenticate_user;

DELIMITER //
CREATE PROCEDURE authenticate_user(IN in_user_id INT)
BEGIN 
  DECLARE result_json JSON;
  DECLARE error_code INT;
  DECLARE message VARCHAR(100) DEFAULT 'User authenticated';

  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'Error';
    SET error_code = 45000;
    ROLLBACK;
  END; 
  
  START TRANSACTION;

  UPDATE users SET auth_status = 1
  WHERE id = in_user_id;
  
  COMMIT;
  
  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;