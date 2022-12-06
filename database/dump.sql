-- Adminer 4.8.1 MySQL 5.7.24 dump

SET NAMES utf8;


SET time_zone = '+00:00';


SET foreign_key_checks = 0;


SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';


DROP TABLE IF EXISTS `User`;


CREATE TABLE `User` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `firstName` varchar(255) DEFAULT NULL,
    `lastName` varchar(255) DEFAULT NULL,
    `gender` varchar(10) DEFAULT NULL,
    `roles` text NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `Post`;


CREATE TABLE `Post` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `content` text, 
    `user_id` int(11) NOT NULL,
    `publicationDate` datetime NOT NULL,
    `illustrationPath` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `Comments`;


CREATE TABLE `Comments` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `content` text NOT NULL,
    `user_id` int(11) NOT NULL,
    `post_id` int(11) NOT NULL,
    PRIMARY KEY (`id`), KEY `user_id` (`user_id`),
    KEY `post_id` (`post_id`),
    CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
    CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `sub_comments`;


CREATE TABLE `sub_comments` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `content` text NOT NULL,
    `user_id` int(11) NOT NULL,
    `comments_id` int(11) NOT NULL,
    PRIMARY KEY (`id`), 
    KEY `user_id` (`user_id`),
    KEY `comments_id` (`comments_id`),
    CONSTRAINT `sub_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
    CONSTRAINT `sub_comments_ibfk_2` FOREIGN KEY (`comments_id`) REFERENCES `Comments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2022-11-15 20:28:58