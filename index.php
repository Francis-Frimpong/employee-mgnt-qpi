<?php
require_once __DIR__ . '/app/Core/Cors.php';

Cors::enable();

require_once __DIR__ . '/app/Core/Router.php';
require_once __DIR__ . '/routes/api.php';

$router->dispatch();