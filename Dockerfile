
# Stage 1: Build frontend
FROM node:20-slim AS frontend-builder
WORKDIR /frontend
COPY frontend/package*.json ./ 
RUN npm install --legacy-peer-deps
COPY frontend/ ./

RUN npm run build

# Stage 2: Set up backend
FROM node:20-slim
WORKDIR /backend
COPY backend/package*.json ./ 
RUN apt-get update && apt-get install -y build-essential python3 && rm -rf /var/lib/apt/lists/*
RUN npm install --legacy-peer-deps
COPY backend/ ./
RUN npm install -g node-pre-gyp
# Rebuild bcrypt to match container environment
RUN npm rebuild bcrypt --build-from-source

# Copy frontend build to backend (e.g., to serve with Express)
COPY --from=frontend-builder /frontend/dist ./public
COPY --from=frontend-builder /frontend/index.html ./
# Expose backend port
EXPOSE 8000
EXPOSE 3000
# Start backend server
CMD ["node", "index.js"]
