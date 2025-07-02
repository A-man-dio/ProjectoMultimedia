-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: multimedia_db
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `musica`
--

DROP TABLE IF EXISTS `musica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caminho_ficheiro` varchar(255) DEFAULT NULL,
  `caminho_foto` varchar(255) DEFAULT NULL,
  `data_lancamento` date DEFAULT NULL,
  `duracao` time(6) DEFAULT NULL,
  `formato` varchar(255) DEFAULT NULL,
  `letra` varchar(255) DEFAULT NULL,
  `tamanho` int DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `id_album` int DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrtg5cc0py68ch4bn877m9hx0n` (`id_album`),
  KEY `FK2o3u7w2d0rfw9h69ghrer51fq` (`id_categoria`),
  CONSTRAINT `FK2o3u7w2d0rfw9h69ghrer51fq` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  CONSTRAINT `FKrtg5cc0py68ch4bn877m9hx0n` FOREIGN KEY (`id_album`) REFERENCES `album` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musica`
--

LOCK TABLES `musica` WRITE;
/*!40000 ALTER TABLE `musica` DISABLE KEYS */;
INSERT INTO `musica` VALUES (1,'/files/musicas/brandao085-deondeeuvenho.m3u8','/files/imagens/issoetrap.jpg','2022-01-20','00:02:40.000000','mp3','/files/letras/brandao085-deondeeuvenho.txt',6,'De Onde Eu Venho',1,4),(2,'/files/musicas/brandao085-sonhos.m3u8','/files/imagens/issoetrap.jpg','2022-01-20','00:03:53.000000','mp3','/files/letras/brandao085-sonhos.txt',5,'Sonhos',1,4),(3,'/files/musicas/wiu-coracaodegelo.m3u8','/files/imagens/manualcomoamarerrado.jpg','2022-11-11','00:02:55.000000','mp3','/files/letras/wiu-coracaodegelo.txt',5,'Coração de Gelo',2,4),(4,'/files/musicas/wiu-flowespacial.m3u8','/files/imagens/manualcomoamarerrado.jpg','2022-11-11','00:03:30.000000','mp3','/files/letras/wiu-flowespacial.txt',7,'Flow Espacial',2,4),(5,'/files/musicas/matue-kennyg.m3u8','/files/imagens/maquinadotempo.jpg','2020-08-28','00:02:40.000000','mp3','/files/letras/matue-kennyg.txt',5,'Kenny G',3,4),(6,'/files/musicas/matue-777666.m3u8','/files/imagens/maquinadotempo.jpg','2020-08-28','00:03:05.000000','mp3','/files/letras/matue-777666.txt',6,'777-666',3,4),(7,'/files/musicas/teto-mustangpreto.m3u8','/files/imagens/previaszip.jpg','2022-12-15','00:02:50.000000','mp3','/files/letras/teto-mustangpreto.txt',5,'Mustang Preto',4,4),(8,'/files/musicas/teto-m4.m3u8','/files/imagens/previaszip.jpg','2022-12-15','00:03:10.000000','mp3','/files/letras/teto-m4.txt',6,'M4 (feat. Matuê)',4,4);
/*!40000 ALTER TABLE `musica` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-02 23:38:19
