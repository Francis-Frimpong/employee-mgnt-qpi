<?php
require_once __DIR__ . '/../Models/Employee.php';
require_once __DIR__ . '/../Core/Response.php';


class EmployeeController
{
    private Employee $employee;

    public function __construct()
    {
        $this->employee = new Employee();
    }

    public function index()
    {
        $data = $this->employee->all();
        Response::json($data, 200);
    }

    public function indexById($id)
    {
        $data = $this->employee->getSingleEmployee($id);

        if(!$data){
            Response::json(['error' => 'Employee not found'], 404);
            return;
        }

        Response::json($data, 200);
    }
}