DROP PROCEDURE IF EXISTS get_user_by_username;

DELIMITER //
CREATE PROCEDURE get_user_by_username(IN in_username VARCHAR(65))
BEGIN
  DECLARE result_json JSON;
  DECLARE error_code INT; 
  DECLARE message VARCHAR(100) DEFAULT 'User found';
  DECLARE auth_status_find TINYINT(1);
  
  DECLARE CONTINUE HANDLER FOR NOT FOUND
  BEGIN
    SET error_code = 1329;
    SET message = 'User not found';
  END;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
  BEGIN
    SET error_code = 45000;
    SET message = 'User not authenticated yet';
  END;

  SELECT 
    JSON_OBJECT(
      'id', id,
      'email', email,
      'username', username,
      'password', password
    ),
    auth_status
  INTO result_json, auth_status_find
  FROM users 
  WHERE username = in_username; 

  IF auth_status_find = 0 AND error_code IS NULL THEN
    SIGNAL SQLSTATE '45000';
  END IF;

  SELECT JSON_OBJECT(
    'result', result_json, 
    'error_code', error_code,
    'message', message
  ) AS response;
END //
DELIMITER ;