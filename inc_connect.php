<?php
/* Pain - outil de gestion des services d'enseignement
 *
 * Copyright 2009-2012 Pierre Boudes,
 * département d'informatique de l'institut Galilée.
 *
 * This file is part of Pain.
 *
 * Pain is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pain is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public
 * License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Pain.  If not, see <http://www.gnu.org/licenses/>.
 */

/* inclusion du fichier realisant la connexion avec les donnees sensibles en dur : */


$link = new mysqli("localhost", "rob", "B2vWyLXVBev2T8yH", "rob");
if ($link->connect_errno) {
    printf("Echec de la connexion : %s\n", $mysqli->connect_error);
    die();
}
$link->query("SET NAMES 'utf8'");
?>
