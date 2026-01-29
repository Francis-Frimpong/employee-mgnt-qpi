<?php
require_once __DIR__ . '/../app/Core/Router.php';
require_once __DIR__ . '/../app/Controllers/EmployeeController.php';

$router = new Router();

// get all employees
$router->get('/employee', [EmployeeController::class, 'index']);

// get a single employee
$router->get('/employee/{id}', [EmployeeController::class, 'indexById']);

// add new employee data
$router->post('/employee', [EmployeeController::class, 'store']);

$router->dispatch();

