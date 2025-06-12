# !bin/bash

if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo "File .env not found"
  exit 1
fi

DIR_SP="./"
FILE_TO_UPDATE_SP="update_all_sp.sql"

echo "Starting update all sp on database $DB_NAME"

mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD $DB_NAME < $DIR_SP/$FILE_TO_UPDATE_SP

if [ $? -eq 0 ]; then
    echo "Update all sp on database $DB_NAME successfully"
else
    echo "Update all sp on database $DB_NAME failed"
fi