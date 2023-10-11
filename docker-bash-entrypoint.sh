#!/bin/sh

# Wait for the database to be ready
/usr/src/app/docker-bash-wait-for-db.sh

# Check if the RUN_MIGRATIONS_AND_SEEDS environment variable is set to "true"
if [ "$RUN_MIGRATIONS_AND_SEEDS" = "true" ]; then
    # Run migrations
    npm run db:migrate

    # Run seeds
    npm run db:seed
fi

# Start the application
npm start
