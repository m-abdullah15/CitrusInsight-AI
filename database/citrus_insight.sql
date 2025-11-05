-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2025 at 12:12 PM
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
(60, 5, 'dense_net', 'Citrus greening', 46.72, '2025-10-23 16:57:23', 'https://res.cloudinary.com/dnhy8zo1b/image/upload/v1761238643/citrus_disease_scans/1761238640_1747399554_I.png'),
(61, 5, 'dense_net', 'Citrus greening', 46.72, '2025-10-24 11:36:47', 'https://res.cloudinary.com/dnhy8zo1b/image/upload/v1761305807/citrus_disease_scans/1761305797_1747399554_I.png');

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
  MODIFY `report_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

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
