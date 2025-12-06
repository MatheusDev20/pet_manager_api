#!/bin/bash
set -e

echo " Starting Local Development Environment"

echo "Starting MySQL container..."
docker compose up -d db
sleep 15

echo ""
echo "Installing Node dependencies..."
npm install

echo ""
echo "Running Prisma migrations and seeding..."
npx prisma migrate dev --name init

echo ""
echo "Generating Prisma Client..."
npx prisma generate

sleep 2

echo ""
echo "Seeding Database..."
npm install ts-node && npx prisma db seed

echo ""
echo "Running Dev server"
npm run dev
