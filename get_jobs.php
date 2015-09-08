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

function get_jobs_php($login) {
    global $link;

    /* execution de la requete */
	$requete = "SELECT id_job, login, comment_text, last_event FROM jobs ORDER BY last_event DESC LIMIT 0, 40";

    $resultat = $link->query($requete)
    or die("Échec de la requête sur la table".$requete."\n".$link->error);
    $arr = array();
    while ($element = $resultat->fetch_object()) {
        $arr[] = $element;
    }
    return json_encode($arr);
}

// $login = phpCAS::getUser();
$login = "boudes";
$json = get_jobs_php($login);
print $json;
?>
