<?php /* -*- coding: utf-8 -*-*/
/* Robot jobs
 *
 * Copyright 2015 Pierre Boudes,
 * département d'informatique de l'institut Galilée.
 *
 * This file is part of Robots jobs.
 *
 * Robot jobs is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Robot jobs is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public
 * License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Robot jobs.  If not, see <http://www.gnu.org/licenses/>.
 */

//require_once('../CAS.php');
// error_reporting(E_ALL & ~E_NOTICE);
//phpCAS::client(CAS_VERSION_2_0,'cas.univ-paris13.fr',443,'/cas/',true);
// phpCAS::setDebug();
//phpCAS::setNoCasServerValidation();

require_once('inc_connect.php');
require_once("utils.php");

function post_job_php($login) {
    global $link;

    /* formation de la requete */
    $set = array();
    $set["login"] = $login;
    $set["comment_text"] = getclean("comment");


    /* get file content */
    $filename  = $_FILES['file']['tmp_name'];
    $content = '';
    print_r($_FILES);
    if ($fp = fopen($filename, 'r')) {
        $content = fread($fp, filesize($filename));
        $content = addslashes($content);
        fclose($fp);
    }
    $set["file_content"] = $content;

    /* formation de la requete */
    $setsql = array();
    foreach ($set as $field => $val) {
        $setsql[] = '`'.$field.'` = "'.$val.'"';
    };
    $strset = implode(", ", $setsql);

    /* execution de la requete */
	$query = "INSERT INTO jobs SET $strset, last_event = NOW()";

    if (!$link->query($query)) {
        errmsg("erreur avec la requete :\n".$query."\n".$link->error);
    }
    $id = $link->insert_id;
    rob_log($query." -- insert_id = $id");
    return $id;
}

//$login = phpCAS::getUser();
$login = "boudes";
$id = post_job_php($login);
echo "{id: $id}";
?>
