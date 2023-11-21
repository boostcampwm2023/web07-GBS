-- --------------------------------------------------------
-- 호스트:                          localhost
-- 서버 버전:                        8.2.0 - MySQL Community Server - GPL
-- 서버 OS:                        Linux
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- gbs 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `gbs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gbs`;

-- 테이블 gbs.stream 구조 내보내기
CREATE TABLE IF NOT EXISTS `stream` (
  `stream_key` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`stream_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 gbs.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stream_key` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oauth_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oauth_type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_758b8ce7c18b9d347461b30228` (`user_id`),
  UNIQUE KEY `IDX_95d512d160789656ed4f21af99` (`oauth_id`),
  UNIQUE KEY `IDX_e2364281027b926b879fa2fa1e` (`nickname`),
  UNIQUE KEY `REL_7aac5bf14432c1aad0bb8cb933` (`stream_key`),
  CONSTRAINT `FK_7aac5bf14432c1aad0bb8cb933b` FOREIGN KEY (`stream_key`) REFERENCES `stream` (`stream_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
