#!/bin/bash

echo "⏳ Ожидание запуска MongoDB..."
until docker exec database mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  sleep 2
done

echo "✅ MongoDB готов. Инициализация Replica Set..."

docker exec database mongosh --eval "rs.initiate()"

# ⏳ Подождать, пока инициализация завершится
echo "⌛ Ожидание завершения инициализации Replica Set..."
sleep 5

# ✅ Настройка конфигурации
docker exec database mongosh --eval "
cfg = rs.conf();
cfg.members[0].host = 'database:27017';
rs.reconfig(cfg, {force: true});
"
