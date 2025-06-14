-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2025 at 11:35 AM
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
-- Database: `citrus_insight`
--

-- --------------------------------------------------------

--
-- Table structure for table `disease_report`
--

CREATE TABLE `disease_report` (
  `report_id` int(10) NOT NULL,
  `user_id` int(5) NOT NULL,
  `model_name` varchar(30) NOT NULL,
  `prediction_result` varchar(255) NOT NULL,
  `confidence_score` float NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disease_report`
--

INSERT INTO `disease_report` (`report_id`, `user_id`, `model_name`, `prediction_result`, `confidence_score`, `time`, `image_path`) VALUES
(23, 3, 'dense_net', 'Citrus greening', 46.72, '2025-05-16 12:45:54', 'uploads/1747399554_I.jpeg'),
(24, 5, 'dense_net', 'Citrus greening', 95.45, '2025-05-16 16:02:23', 'uploads/1747411343_I3.jpeg'),
(25, 5, 'dense_net', 'Spiny whitefly', 97.23, '2025-05-16 16:04:40', 'uploads/1747411480_I2.jpeg'),
(26, 5, 'dense_net', 'Foliage damaged', 100, '2025-05-16 18:20:50', 'uploads/1747419650_I6.jpeg'),
(27, 5, 'dense_net', 'Citrus canker', 69.1, '2025-05-17 05:08:41', 'uploads/1747458521_I5.jpeg'),
(28, 5, 'dense_net', 'Citrus canker', 69.1, '2025-05-17 05:19:32', 'uploads/1747459172_I5.jpeg'),
(29, 5, 'dense_net', 'Die back', 99.98, '2025-05-17 10:14:52', 'uploads/1747476892_I4.jpeg'),
(30, 5, 'dense_net', 'Spiny whitefly', 97.23, '2025-05-17 16:32:54', 'uploads/1747499574_I2.jpeg'),
(31, 5, 'dense_net', 'Spiny whitefly', 97.23, '2025-05-17 16:55:04', 'uploads/1747500904_I2.jpeg'),
(32, 5, 'dense_net', 'Citrus canker', 69.1, '2025-05-17 18:08:02', 'uploads/1747505282_I5.jpeg'),
(33, 5, 'dense_net', 'Citrus greening', 46.72, '2025-05-17 18:14:55', 'uploads/1747505695_I.jpeg'),
(34, 5, 'dense_net', 'Citrus greening', 46.72, '2025-05-17 18:15:50', 'uploads/1747505750_I.jpeg'),
(35, 5, 'dense_net', 'Citrus greening', 95.45, '2025-05-17 18:17:41', 'uploads/1747505861_I3.jpeg'),
(36, 5, 'dense_net', 'Foliage damaged', 100, '2025-05-17 18:19:20', 'uploads/1747505960_I6.jpeg'),
(37, 5, 'dense_net', 'Citrus greening', 46.72, '2025-05-17 18:19:29', 'uploads/1747505969_I.jpeg'),
(38, 7, 'dense_net', 'Citrus greening', 46.72, '2025-05-17 18:38:12', 'uploads/1747507092_I.jpeg'),
(39, 7, 'dense_net', 'Citrus canker', 69.1, '2025-05-17 18:55:20', 'uploads/1747508120_I5.jpeg'),
(40, 7, 'dense_net', 'Die back', 99.98, '2025-05-17 19:10:53', 'uploads/1747509053_I4.jpeg'),
(41, 5, 'dense_net', 'Citrus canker', 69.1, '2025-05-18 09:59:38', 'uploads/1747562378_I5.jpeg'),
(42, 5, 'dense_net', 'Foliage damaged', 100, '2025-05-18 12:07:42', 'uploads/1747570062_I6.jpeg'),
(43, 5, 'dense_net', 'Citrus canker', 99.39, '2025-05-18 15:06:07', 'uploads/1747580767_download.jpg'),
(44, 5, 'dense_net', 'Die back', 100, '2025-05-18 18:00:16', 'uploads/1747591216_citrus_canker_1.jpg'),
(45, 5, 'dense_net', 'Die back', 99.98, '2025-05-19 07:00:13', 'uploads/1747638013_I4.jpeg'),
(46, 5, 'dense_net', 'Citrus greening', 95.45, '2025-05-19 07:04:20', 'uploads/1747638260_I3.jpeg'),
(47, 5, 'dense_net', 'Citrus greening', 95.45, '2025-05-19 08:53:32', 'uploads/1747644812_I3.jpeg'),
(48, 5, 'dense_net', 'Foliage damaged', 100, '2025-05-19 08:57:13', 'uploads/1747645033_I6.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `farm_data`
--

CREATE TABLE `farm_data` (
  `farm_id` int(4) NOT NULL,
  `user_id` int(5) NOT NULL,
  `farm_size` int(10) NOT NULL,
  `plant_count` int(10) NOT NULL,
  `soil_type` varchar(20) NOT NULL,
  `avg_temperature` int(4) NOT NULL,
  `citrus_type` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farm_data`
--

INSERT INTO `farm_data` (`farm_id`, `user_id`, `farm_size`, `plant_count`, `soil_type`, `avg_temperature`, `citrus_type`) VALUES
(1, 3, 5, 80, 'sandy', 39, 'kinnow'),
(2, 5, 2, 40, 'sandy', 40, 'kinnow'),
(3, 5, 2, 40, 'sandy', 39, 'kinnow');

-- --------------------------------------------------------

--
-- Table structure for table `ml_model`
--

CREATE TABLE `ml_model` (
  `model_id` int(20) NOT NULL,
  `model_name` varchar(20) NOT NULL,
  `accuracy` int(2) NOT NULL,
  `trainning_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ml_model`
--

INSERT INTO `ml_model` (`model_id`, `model_name`, `accuracy`, `trainning_date`) VALUES
(1, 'dense_net', 95, '2024-12-31');

-- --------------------------------------------------------

--
-- Table structure for table `solution`
--

CREATE TABLE `solution` (
  `disease_name` varchar(20) NOT NULL,
  `solution_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `solution`
--

INSERT INTO `solution` (`disease_name`, `solution_text`) VALUES
('Citrus_canker', '<h2>Chemical control</h2><ul><li>1st spray of Bordeauxe mixture (1%) after fruit harvest).</li><li>2nd spray during the month of April Copper Oxycholoride @3gm/lit. of water)</li><li>3rd spray during the month of July-August Copper Hydrooxide @2.5gm/lit. of water</li></ul>Early detection and removal of infected plants are crucial.<h3 class=\'solution_heading\'>Source:</h3><a href=\'https://aari.punjab.gov.pk/Cit-Dis\'>Ayub Agricultural Research Institute,Faisalabad</a> ');

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `user_id` int(5) NOT NULL,
  `name` varchar(20) NOT NULL,
  `username` varchar(10) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`user_id`, `name`, `username`, `email`, `password`, `date`) VALUES
(5, 'Muhammad Abdullah', 'abdullah', 'abdjutt777@gmail.com', '123456', '2025-05-16'),
(7, 'Usman Bashir ', 'usman', 'usman786@gmail.com', '123456', '2025-05-17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `disease_report`
--
ALTER TABLE `disease_report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `fk_id` (`user_id`);

--
-- Indexes for table `farm_data`
--
ALTER TABLE `farm_data`
  ADD PRIMARY KEY (`farm_id`);

--
-- Indexes for table `ml_model`
--
ALTER TABLE `ml_model`
  ADD PRIMARY KEY (`model_id`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `disease_report`
--
ALTER TABLE `disease_report`
  MODIFY `report_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `farm_data`
--
ALTER TABLE `farm_data`
  MODIFY `farm_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ml_model`
--
ALTER TABLE `ml_model`
  MODIFY `model_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
