DROP PROCEDURE IF EXISTS delete_user_to_company;

DELIMITER //
CREATE PROCEDURE delete_user_to_company(in in_user_id INT, in in_company_id INT)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'User deleted from company';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN 
    SET message = 'An error occurred while deleting the user from the company';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  DELETE FROM users_companies
  WHERE user_id = in_user_id AND company_id = in_company_id;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
