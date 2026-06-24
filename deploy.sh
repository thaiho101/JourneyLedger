#!/bin/bash

set -e

PROJECT_DIR="/home/pi/personalDev/JourneyLedger"

echo "=== JourneyLedger Deployment Started ==="

echo "Step 1: Go to project directory..."
cd "$PROJECT_DIR"

echo "Step 2: Synce code with Github main branch..."
git fetch origin
git reset --hard origin/main
git log --oneline -1

echo "Step 3: Build backend..."
cd "$PROJECT_DIR/backend"
./mvnw clean package -DskipTests

echo "Step 4: Restart backend service..."
sudo systemctl restart journeyledger

echo "Step 5: Build frontend..."
cd "$PROJECT_DIR/frontend"
source /home/pi/.nvm/nvm.sh
nvm use 22
npm run build

echo "Step 6: Restart frontend service..."
sudo systemctl restart journeyledger-frontend

echo "Step 7: Check services..."
sudo systemctl is-active --quiet journeyledger
echo "Backend is running."

sudo systemctl is-active --quiet journeyledger-frontend
echo "Frontend is running."

echo "=== JourneyLedger Deployment Completed Successfully ==="
