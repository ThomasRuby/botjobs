CREATE TABLE IF NOT EXISTS `jobs` (
  `id_job` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(40) COLLATE utf8_swedish_ci DEFAULT NULL,
  `file_content` MEDIUMBLOB NOT NULL,
  `comment_text` text COLLATE utf8_swedish_ci,
  `last_event` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_job`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

# status : 0 = normal exit, 1 = interrupted, 2 = running
CREATE TABLE IF NOT EXISTS `results` (
  `id_result` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `id_job` int(3) unsigned NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stop_date` timestamp,
  `status` int(3) unsigned DEFAULT 3,
  `bot` varchar(256) COLLATE utf8_swedish_ci NOT NULL,
  PRIMARY KEY (`id_result`),
  KEY (`id_job`),
  KEY (`bot`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `bots` (
  `bot` varchar(256) COLLATE utf8_swedish_ci NOT NULL,
  `expiration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(256) COLLATE utf8_swedish_ci NOT NULL,
  PRIMARY KEY (`bot`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
