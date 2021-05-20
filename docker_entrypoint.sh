#!/bin/bash
set -e

# Check that necessary env variables are set for runtime.
CHECK_VARS=(${API_KEY:?}${API_URL:?})

envsubst '$API_KEY, $API_URL' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp
mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf

exec "$@"
