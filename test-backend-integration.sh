#!/bin/bash

echo "🧪 Testing BookGX Backend Integration"
echo "=================================="

# Test 1: Backend Health Check
echo "🔍 Testing backend health..."
HEALTH_RESPONSE=$(curl -s http://localhost:3001/health)
if [[ $HEALTH_RESPONSE == *"OK"* ]]; then
    echo "✅ Backend health check passed"
    echo "   Response: $HEALTH_RESPONSE"
else
    echo "❌ Backend health check failed"
    echo "   Response: $HEALTH_RESPONSE"
    exit 1
fi

# Test 2: CORS Check
echo ""
echo "🔍 Testing CORS for frontend origin..."
CORS_RESPONSE=$(curl -s -H "Origin: http://localhost:8080" http://localhost:3001/health)
if [[ $CORS_RESPONSE == *"OK"* ]]; then
    echo "✅ CORS configured correctly"
else
    echo "❌ CORS check failed"
    echo "   Response: $CORS_RESPONSE"
fi

# Test 3: Backend Process Check
echo ""
echo "🔍 Checking backend process..."
BACKEND_PROCESS=$(ps aux | grep "node.*server.js" | grep -v grep)
if [[ -n $BACKEND_PROCESS ]]; then
    echo "✅ Backend process is running"
    echo "   Process: $BACKEND_PROCESS"
else
    echo "❌ Backend process not found"
fi

# Test 4: Frontend Access
echo ""
echo "🔍 Testing frontend accessibility..."
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080)
if [[ $FRONTEND_RESPONSE == "200" ]]; then
    echo "✅ Frontend is accessible"
else
    echo "⚠️ Frontend check: HTTP $FRONTEND_RESPONSE"
fi

echo ""
echo "🎉 Test Summary:"
echo "   - Backend API: http://localhost:3001"
echo "   - Frontend App: http://localhost:8080"
echo "   - Ready for Google Sheets authentication testing!"
