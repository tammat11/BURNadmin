#!/usr/bin/env bash
# Переносит собранную админку из репозитория приложения в этот сайт.
#
# Админка написана в burn2 и собирается вместе с мобильным приложением, а
# раздаётся с домена клуба. Значит, в репозитории сайта лежит артефакт
# сборки — он неизбежно устареет, если про него забыть. Скрипт существует
# ровно для того, чтобы обновление было одной командой, а не археологией.
#
#   ./scripts/sync-admin.sh [путь-к-burn2]
#
# Перед запуском в burn2 нужно собрать бандл: npx vite build
set -euo pipefail

SRC="${1:-$HOME/Documents/burn2}/dist/client"
DST="$(cd "$(dirname "$0")/.." && pwd)"

[ -f "$SRC/admin.html" ] || { echo "Нет $SRC/admin.html — соберите: (cd ${1:-~/Documents/burn2} && npx vite build)"; exit 1; }

cp "$SRC/admin.html" "$DST/admin.html"
mkdir -p "$DST/app-assets"
cp "$SRC"/app-assets/*.png "$DST/app-assets/"

# Имена файлов бандла содержат хеш и меняются при каждой правке админки,
# поэтому копируем по ссылкам из самого admin.html, а не по списку.
grep -o '/assets/[A-Za-z0-9_.-]*' "$SRC/admin.html" | sort -u | while read -r ref; do
  cp "$SRC$ref" "$DST$ref"
  echo "  $ref"
done

echo "Готово. Старые admin-*.js/css из assets/ можно удалить вручную."
