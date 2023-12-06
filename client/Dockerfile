# 첫 번째 단계: 빌드 환경 구축
FROM --platform=linux/amd64 node:lts-alpine as build-stage

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json yarn.lock .env ./
RUN yarn install && yarn global add typescript

# 소스 코드 복사
COPY . .

RUN ls -l
# 애플리케이션 빌드
RUN yarn build

# 두 번째 단계: Nginx를 사용하여 애플리케이션 서빙
FROM --platform=linux/amd64 nginx:stable-alpine as production-stage

# 빌드된 파일을 Nginx 서버로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 80 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
