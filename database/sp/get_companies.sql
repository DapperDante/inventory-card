DROP PROCEDURE IF EXISTS get_companies;

DELIMITER //
CREATE PROCEDURE get_companies(IN in_user_id INT)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'companies retrieved';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'An error occurred while retrieving the companies';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
    'company_id', companies.id,
    'company_name', companies.name
    )
  ) 
  INTO result_json
  FROM companies 
  JOIN users_companies ON companies.id = users_companies.company_id
  WHERE users_companies.user_id = in_user_id;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
