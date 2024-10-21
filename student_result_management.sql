-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2024 at 05:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_result_management`
--

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password_hash`, `created_at`, `name`, `password`, `role`) VALUES
(1, '', 'ziaeldeep84@gmail.com', '', '2024-10-18 22:06:08', 'ziad', '$2y$10$XT.hdNooBAi.W6yBQ59vR.tdrH3OW/iVhXdvDUqE/mouohM9puhl.', 'user'),
(2, '', 'ziad605@yahoo.com', '', '2024-10-18 22:07:26', 'zz', '1111', 'user'),
(3, '', 'ccds@gmail.com', '', '2024-10-19 17:35:09', 'card', '1111', 'user'),
(4, '', 'xojeve2492@aicogz.com', '', '2024-10-19 17:44:14', 'xxx', 'zz', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
