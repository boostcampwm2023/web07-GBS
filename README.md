![image](https://github.com/boostcampwm2023/web07-GBS/assets/21211957/cc6c597b-09aa-4312-8ab0-30eec394dcfa)

# 🔎 프로젝트 소개

```
GBS에서는 아프리카 TV, 트위치와 같이 실시간으로 인터넷 방송을 하거나 볼 수 있습니다.

스트리머는 OBS를 사용해서 GBS로 실시간 방송을 송출할 수 있습니다.

또한, 시청자는 방송을 보면서 채팅을 통해 다른 사람들과 실시간으로 소통할 수 있습니다.
```

# 📺 프로젝트 주소

> https://gbs-live.site/

# 👨‍👩‍👧‍👦 팀 소개

|                               👑 J136 정명희                               |                                J011 김경근                                 |                                J158 최상원                                 |                                 J164 한원준                                 |
| :------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
|                                     BE                                     |                                     BE                                     |                                     FE                                     |                                     FE                                      |
| <img src="https://avatars.githubusercontent.com/u/92200502?v=4" width=150> | <img src="https://avatars.githubusercontent.com/u/97646802?v=4" width=150> | <img src="https://avatars.githubusercontent.com/u/21211957?v=4" width=150> | <img src="https://avatars.githubusercontent.com/u/119842443?v=4" width=150> |
|                   [@jmhee28](https://github.com/jmhee28)                   |                      [@kkg5](https://github.com/kkg5)                      |               [@ChoiSangwon](https://github.com/ChoiSangwon)               |                [@top-chaser](https://github.com/top-chaser)                 |

# ⚒️ 주요 기능

> 네이버 및 구글 아이디로 간편 로그인을 할 수 있어요!

![스크린샷 2023-12-11 165508](https://github.com/boostcampwm2023/web07-GBS/assets/119842443/214c3463-8f09-442b-9d38-0533b80acd23)

> 방송을 하고 싶다면 방송 비밀 키와 OBS를 연동해 GBS로 방송을 송출할 수 있어요!

![스크린샷 2023-12-11 165719](https://github.com/boostcampwm2023/web07-GBS/assets/119842443/a772399b-40ae-46eb-aca8-4215fe23dd51)

> 방송을 보고 싶다면 메인 화면에서 현재 진행중인 방송을 볼 수 있어요!

![스크린샷 2023-12-11 165455](https://github.com/boostcampwm2023/web07-GBS/assets/119842443/ca47c885-7136-4472-b56f-5b74d7e398db)

> 원하는 방송에 들어가 채팅을 통해 다른 시청자들과 소통할 수 있어요!

![스크린샷 2023-12-11 173110](https://github.com/boostcampwm2023/web07-GBS/assets/119842443/716297bf-934d-453b-a39b-33b22327b339)

# 🔥 기술적 도전

## ⏺ Storybook 적용

- 컴포넌트를 보다 잘 관리하기 위해서 Storybook을 적용했습니다.
- Storybook을 사용하면서 의존성이 낮고 재사용성이 좋은 컴포넌트를 구현하기 위해 고민 할 수 있었습니다.

## ⏺ 다크모드 구현

- 보다 나은 사용자 경험을 위해서 사이트 전체에 대해 다크모드를 적용했습니다.
- 다크모드를 적용하기 위해 ThemeProvider 및 Recoil를 사용하며, 전역 상태 관리에 대해 알 수 있었습니다.

## ⏺ 스트리밍 서비스 구현

- 스트리밍 서비스를 구현하며 RTMP, HLS 프로토콜에 대해 배울 수 있었습니다.

## ⏺ 간편 로그인 구현

- 사용자가 더 쉽고 빠르게 서비스에 접근할 수 있도록 OAuth를 이용한 간편 로그인을 적용했습니다.
- 간편 로그인을 구현하는 과정에서 oAuth의 동작 방식에 대해 공부할 수 있었습니다.
- 쿠키를 통한 로그인 검증을 구현하며, httpOnly나 sameSite와 같은 쿠키의 속성에 대해 배울 수 있었습니다.

# ⚙️ 기술 스택

<div align="center">

<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white"/>
<img src="https://img.shields.io/badge/socketdotio-010101?style=for-the-badge&logo=socketdotio&logoColor=white"/>
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"/>

</br>

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"/>
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/>

</br>

<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
<img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/>
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>

</div>

</br>

**더 자세한 내용을 보고 싶으시다면 [금쪽이들의 wiki](https://github.com/boostcampwm2023/web07-GBS/wiki)나 [금쪽이들의 notion](https://www.notion.so/GBS-b3e35f1c05c24973a722bd406218a6ae)를 참고해주세요!**
