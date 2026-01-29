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

    public function store()
    {
        // Get JSON input
        $data = json_decode(file_get_contents('php://input'), true);

        // Check required fields
        $required = [
        'employee_code',
        'first_name',
        'last_name',
        'email',
        'phone',
        'gender',
        'job_title',
        'salary',
        'hire_date',
        'status'
    ];

    foreach ($required as $field) {
        if (empty($data[$field])) {
            Response::json(['error' => "$field is required"], 400);
            return;
        }
    }

        // pass safe data to model
        $result = $this->employee->create($data);
        Response::json($result, 201);
    }
}