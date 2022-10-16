-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2019 at 06:39 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `empty_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `old_mobile`
--
DROP TABLE IF EXISTS `old_mobile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `old_mobile` (
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `party_name` varchar(45) DEFAULT NULL,
  `mobile_no` varchar(45) DEFAULT NULL,
  `Bill_details` varchar(225) DEFAULT NULL,
  `id_proof_detail` varchar(225) DEFAULT NULL,
  `model_no` varchar(45) DEFAULT NULL,
  `imei_no` varchar(45) DEFAULT NULL,
  `purchase_price` varchar(45) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` int(11) NOT NULL DEFAULT 0 COMMENT 'false=0,true=1',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT 'active=0,deactive=1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `old_mobile`
--

LOCK TABLES `old_mobile` WRITE;
/*!40000 ALTER TABLE `old_mobile` DISABLE KEYS */;
/*!40000 ALTER TABLE `old_mobile` ENABLE KEYS */;
UNLOCK TABLES;
ALTER TABLE `old_mobile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

--
-- Table structure for table `ledger`
--
DROP TABLE IF EXISTS `ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ledger` (
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `Coustmer_name` varchar(45) DEFAULT NULL,
  `invoice_no` varchar(45) DEFAULT NULL,
  `debit_amount` varchar(225) DEFAULT NULL,
  `credit_amount` varchar(225) DEFAULT NULL,
  `total_balance` varchar(45) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` int(11) NOT NULL DEFAULT 0 COMMENT 'false=0,true=1',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT 'active=0,deactive=1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ledger`
--

LOCK TABLES `ledger` WRITE;
/*!40000 ALTER TABLE `ledger` DISABLE KEYS */;
/*!40000 ALTER TABLE `ledger` ENABLE KEYS */;
UNLOCK TABLES;
ALTER TABLE `ledger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;
--
-- Table structure for table `mrp_stock`
--

DROP TABLE IF EXISTS `mrp_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mrp_stock` (
  `user_id` int(11) DEFAULT NULL,
    `id` int(11) DEFAULT NULL,
  `party_name` varchar(45) DEFAULT NULL,
  `mobile_no` varchar(45) DEFAULT NULL,
  `model_no` varchar(45) DEFAULT NULL,
  `imei_no` varchar(45) DEFAULT NULL,
  `purchase_price` varchar(45) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` int(11) NOT NULL DEFAULT 0 COMMENT 'false=0,true=1',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT 'active=0,deactive=1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `mrp_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;
--
-- Dumping data for table `mrp_stock`
--

LOCK TABLES `mrp_stock` WRITE;
/*!40000 ALTER TABLE `mrp_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `mrp_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `user_id` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `branch_name` varchar(255) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `gstno` varchar(255) NOT NULL,
  `contact_mobile` varchar(255) NOT NULL,
  `work_phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` int(11) NOT NULL DEFAULT 0 COMMENT 'false=0,true=1',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT 'active=0,deactive=1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;
--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_transfer_log`
--
DROP TABLE IF EXISTS `stock_transfer_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_transfer_log` (
  `user_id` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL, 
  `Branch_name` varchar(255) NOT NULL,
  `Stock_name` varchar(255) NOT NULL,
  `Stock_quantity` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` int(11) NOT NULL DEFAULT 0 COMMENT 'false=0,true=1',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT 'active=0,deactive=1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `stock_transfer_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;
--
-- Dumping data for table `stock_transfer_log`
--

LOCK TABLES `stock_transfer_log` WRITE;
/*!40000 ALTER TABLE `stock_transfer_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_transfer_log` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `user_detail_admin`
--
DROP TABLE IF EXISTS `user_detail_admin`;

CREATE TABLE `user_detail_admin` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `device_token` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_type` int(11) NOT NULL COMMENT 'user=0,admin=1',
  `is_deleted` int(11) NOT NULL DEFAULT 0 COMMENT 'false=0,true=1',
  `mobile` varchar(12) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT 'active=0,deactive=1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_detail_admin`
--

INSERT INTO `user_detail_admin` (`user_id`, `name`, `image_name`, `password`, `email`, `access_token`, `device_token`, `created_date`, `modify_date`, `user_type`, `is_deleted`, `mobile`, `status`) VALUES
(1, 'Jenil', 'profile/201911032241134113jCjf0FINIP.png', '123', 'admin@admin.com', 'bLVPOhvXA3vRz9R4BCnp20220601171906196', 'gfgd4545', '2019-10-24 06:38:20', '2019-11-03 22:51:01', 1, 0, '', 0);
INSERT INTO `user_detail_admin` (`user_id`, `name`, `image_name`, `password`, `email`, `access_token`, `device_token`, `created_date`, `modify_date`, `user_type`, `is_deleted`, `mobile`, `status`) VALUES
(2, 'Sahil', 'profile/201911032241134113jCjf0FINIP.png', '123', 'sahil@admin.com', 'bLVPOhvXA3vRz9R4BCnp20220601171906196', 'gfgd4545', '2019-10-24 06:38:20', '2019-11-03 22:51:01', 1, 0, '', 0);
INSERT INTO `user_detail_admin` (`user_id`, `name`, `image_name`, `password`, `email`, `access_token`, `device_token`, `created_date`, `modify_date`, `user_type`, `is_deleted`, `mobile`, `status`) VALUES
(3, 'Anish', 'profile/201911032241134113jCjf0FINIP.png', '123', 'anish@admin.com', 'bLVPOhvXA3vRz9R4BCnp20220601171906196', 'gfgd4545', '2019-10-24 06:38:20', '2019-11-03 22:51:01', 1, 0, '', 0);
--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_detail_admin`
--
ALTER TABLE `user_detail_admin`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_detail_admin`
--
ALTER TABLE `user_detail_admin`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


--
-- Table structure for table `user_detail_branch`
--
DROP TABLE IF EXISTS `user_detail_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_detail_branch` (
  `user_id` int(11) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `GST_number` varchar(255) NOT NULL,
  `contact_mobile` varchar(255) NOT NULL,
  `work_phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `device_token` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_type` int(11) NOT NULL COMMENT 'user=1,admin=0',
  `is_deleted` int(11) NOT NULL DEFAULT 0 COMMENT 'false=0,true=1',
  `mobile` varchar(12) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT 'active=0,deactive=1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `user_detail_branch` (`user_id`, `branch_name`, `contact_name`,`display_name` , `GST_number`,`contact_mobile`,`work_phone` ,`email`, `password`,`address`, `access_token`, `device_token`, `created_date`, `modify_date`, `user_type`, `is_deleted`, `mobile`, `status`) VALUES
(1, 'jenil', 'jenil ghevariya', 'admin','33AADDCCVV22SD','1234567890','2548157', 'jenil@admin.com', '123','sicilia surat', 'bLVPOhvXA3vRz9R4BCnp20220601171906196', 'gfgd4545', '2019-10-24 06:38:20', '2019-11-03 22:51:01', 1, 0, '', 0);


ALTER TABLE `user_detail_branch`
  ADD PRIMARY KEY (`user_id`);


ALTER TABLE `user_detail_branch`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;
--
-- Dumping data for table `user_detail_branch`
--

LOCK TABLES `user_detail_branch` WRITE;
/*!40000 ALTER TABLE `user_detail_branch` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_detail_branch` ENABLE KEYS */;
UNLOCK TABLES;

