-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Gegenereerd op: 31 mrt 2017 om 03:26
-- Serverversie: 10.1.13-MariaDB
-- PHP-versie: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contacts`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `persons`
--

CREATE TABLE `persons` (
  `name` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `persons`
--

INSERT INTO `persons` (`name`, `phone_number`, `id`, `email`) VALUES
('anne', '0653532312', 24, 'uilen@huilen.nl'),
('bets', '022255655', 34, 'jordan@redi.com'),
('robert', '0749869662', 35, 'Almor@wikipop.com'),
('john', '073889138', 38, 'yaklp@yalpa.nl'),
('Annabel', '0657829212', 39, 'Troy@webian.be'),
('argo', '057328943', 40, 'desmon@west.col'),
('Bjorn', '063872497', 41, 'Jerom@grand.co');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
