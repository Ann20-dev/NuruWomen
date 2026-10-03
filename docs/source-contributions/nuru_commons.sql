-- MariaDB / MySQL dump
-- Database: nuru_commons
-- Project: Nuru Commons (Privacy-First Women's Health Platform)

SET FOREIGN_KEY_CHECKS = 0;


-- Table 1: roles
-- Authenticated roles restricted to medical professionals & system admins

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(50) NOT NULL,
  `description` TEXT DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `roles` (`role_id`, `role_name`, `description`) VALUES
(1, 'Admin', 'Platform administration, verification oversight, and security audits.'),
(2, 'Doctor', 'Licensed medical doctor providing verified clinical advice.'),
(3, 'Nurse', 'Registered nurse or midwife providing professional care guidance.'),
(4, 'Qualified Professional', 'Certified clinical healthcare specialist or counselor.');


-- Table 2: users
-- Only medical staff and admins have accounts in this table

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_id` INT(11) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_users_roles` (`role_id`),
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table 3: doctor_profiles
-- Verification and credentials for logged-in medical staff

DROP TABLE IF EXISTS `doctor_profiles`;
CREATE TABLE `doctor_profiles` (
  `doctor_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `license_number` VARCHAR(100) NOT NULL,
  `specialization` VARCHAR(100) NOT NULL,
  `hospital_affiliation` VARCHAR(150) DEFAULT NULL,
  `verification_status` ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
  `verified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  UNIQUE KEY `license_number` (`license_number`),
  KEY `fk_doctors_users` (`user_id`),
  CONSTRAINT `fk_doctors_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table 4: health_categories
-- The 6 main health categories 

DROP TABLE IF EXISTS `health_categories`;
CREATE TABLE `health_categories` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `health_categories` (`category_id`, `category_name`, `description`) VALUES
(1, 'Menstruation', 'Cycle tracking, period management, severe pain, and menstrual hygiene.'),
(2, 'Healthy Aging', 'Menopause, hormonal shifts, reproductive aging, and long-term health.'),
(3, 'Post Partum', 'Postpartum recovery, postpartum care, maternal mental wellness, and newborn care.'),
(4, 'Sexual Health', 'Sexual wellness, safe abortion care, PCOS, STI prevention, and reproductive rights.'),
(5, 'Fertility', 'Conception guidance, fertility awareness, ovulation, and family planning.'),
(6, 'Mental Health', 'Depression, anxiety, emotional well-being, and trauma support.');


-- Table 5: questions
-- Submitted anonymously via Nostr keys 

DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `question_id` INT(11) NOT NULL AUTO_INCREMENT,
  `category_id` INT(11) NOT NULL,
  `nostr_pubkey` VARCHAR(64) NOT NULL,
  `nostr_event_id` VARCHAR(64) DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`question_id`),
  KEY `fk_questions_categories` (`category_id`),
  CONSTRAINT `fk_questions_categories` FOREIGN KEY (`category_id`) REFERENCES `health_categories` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table 6: responses
-- Supports BOTH anonymous Nostr public replies AND logged-in Doctor responses

DROP TABLE IF EXISTS `responses`;
CREATE TABLE `responses` (
  `response_id` INT(11) NOT NULL AUTO_INCREMENT,
  `question_id` INT(11) NOT NULL,
  `user_id` INT(11) DEFAULT NULL, -- NULL for anonymous community replies; populated for logged-in medical professionals
  `nostr_pubkey` VARCHAR(64) DEFAULT NULL,
  `nostr_event_id` VARCHAR(64) DEFAULT NULL,
  `content` TEXT NOT NULL,
  `is_verified_medical` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`response_id`),
  KEY `fk_responses_questions` (`question_id`),
  KEY `fk_responses_users` (`user_id`),
  CONSTRAINT `fk_responses_questions` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_responses_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table 7: evidence_cards
-- Clinical evidence citations attached to medical responses by doctors

DROP TABLE IF EXISTS `evidence_cards`;
CREATE TABLE `evidence_cards` (
  `card_id` INT(11) NOT NULL AUTO_INCREMENT,
  `response_id` INT(11) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `source_url` VARCHAR(500) DEFAULT NULL,
  `citation_text` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`card_id`),
  KEY `fk_evidence_responses` (`response_id`),
  CONSTRAINT `fk_evidence_responses` FOREIGN KEY (`response_id`) REFERENCES `responses` (`response_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table 8: emergency_hotlines
-- Public health resources and hotlines for key categories

DROP TABLE IF EXISTS `emergency_hotlines`;
CREATE TABLE `emergency_hotlines` (
  `hotline_id` INT(11) NOT NULL AUTO_INCREMENT,
  `category_id` INT(11) DEFAULT NULL,
  `organization_name` VARCHAR(150) NOT NULL,
  `phone_number` VARCHAR(50) NOT NULL,
  `description` TEXT DEFAULT NULL,
  PRIMARY KEY (`hotline_id`),
  KEY `fk_hotlines_categories` (`category_id`),
  CONSTRAINT `fk_hotlines_categories` FOREIGN KEY (`category_id`) REFERENCES `health_categories` (`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table 9: topic_aggregates
-- Anonymized topic engagement counters (privacy-safe analytics)

DROP TABLE IF EXISTS `topic_aggregates`;
CREATE TABLE `topic_aggregates` (
  `aggregate_id` INT(11) NOT NULL AUTO_INCREMENT,
  `category_id` INT(11) NOT NULL,
  `question_count` INT(11) DEFAULT 0,
  `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`aggregate_id`),
  KEY `fk_aggregates_categories` (`category_id`),
  CONSTRAINT `fk_aggregates_categories` FOREIGN KEY (`category_id`) REFERENCES `health_categories` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table 10: audit_logs
-- Tracks administrative actions, credential verifications, and logins

DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `log_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) DEFAULT NULL,
  `action_performed` VARCHAR(255) NOT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `fk_audit_users` (`user_id`),
  CONSTRAINT `fk_audit_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table 11: peer_profiles (Optional Nostr Pseudonyms)
-- Purely maps Nostr public keys to opt-in pseudonyms without login accounts

DROP TABLE IF EXISTS `peer_profiles`;
CREATE TABLE `peer_profiles` (
  `profile_id` INT(11) NOT NULL AUTO_INCREMENT,
  `nostr_pubkey` VARCHAR(64) NOT NULL,
  `pseudonym` VARCHAR(100) DEFAULT 'Anonymous Peer',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`profile_id`),
  UNIQUE KEY `nostr_pubkey` (`nostr_pubkey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;