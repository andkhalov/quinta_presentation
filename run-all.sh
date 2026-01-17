#!/bin/bash

# Quinta Essentia Marketing Platform - Startup Script
# Usage: ./run-all.sh [port]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default port
PORT=${1:-8765}

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APP_DIR="$SCRIPT_DIR/quinta_app"

echo -e "${GREEN}🌟 Quinta Essentia Marketing Platform${NC}"
echo "======================================"
echo ""

# Check if quinta_app directory exists
if [ ! -d "$APP_DIR" ]; then
    echo -e "${RED}❌ Error: quinta_app directory not found${NC}"
    echo "Expected at: $APP_DIR"
    exit 1
fi

cd "$APP_DIR"

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Error: Python 3 is not installed${NC}"
    echo "Please install Python 3.11 or higher"
    exit 1
fi

echo -e "${YELLOW}📦 Checking virtual environment...${NC}"

# Create venv if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies if requirements.txt exists and venv was just created or deps missing
if [ -f "requirements.txt" ]; then
    if ! python -c "import django" 2>/dev/null; then
        echo -e "${YELLOW}📥 Installing dependencies...${NC}"
        pip install -r requirements.txt --quiet
    fi
fi

echo -e "${YELLOW}🗄️  Running migrations...${NC}"
python manage.py migrate --run-syncdb --verbosity=0

# Check if port is in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Port $PORT is already in use${NC}"
    echo -e "Killing existing process..."
    lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
    sleep 1
fi

echo ""
echo -e "${GREEN}🚀 Starting server on port $PORT...${NC}"
echo ""
echo "======================================"
echo -e "${GREEN}✅ Application is running!${NC}"
echo ""
echo "   Open in browser:"
echo -e "   ${YELLOW}http://localhost:$PORT/calculator/${NC}"
echo ""
echo "   Press Ctrl+C to stop"
echo "======================================"
echo ""

# Run the server
python manage.py runserver $PORT
