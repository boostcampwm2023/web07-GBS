# 첫 번째 단계: 빌드 환경 구축
FROM node:lts-alpine as build-stage

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY ./client/package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 두 번째 단계: Nginx를 사용하여 애플리케이션 서빙
FROM nginx:stable-alpine as production-stage

# 빌드된 파일을 Nginx 서버로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx 설정 파일 복사 (선택 사항)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
