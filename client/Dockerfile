# 첫 번째 단계: 빌드 환경 구축
FROM --platform=linux/amd64 node:lts-alpine as build-stage

# 환경변수를 위한 ARG 지시어 추가
ARG VITE_API_URL

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json yarn.lock ./
RUN yarn install && yarn global add typescript

# 소스 코드 복사
COPY . .

# .env 파일 생성
RUN echo "VITE_API_URL=$VITE_API_URL" > .env

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
