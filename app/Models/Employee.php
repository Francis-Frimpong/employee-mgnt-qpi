<?php
require_once __DIR__ . '/../Config/Database.php';

class Employee
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    // Get all employee's data
    public function all()
    {
        $stmt =  $this->db->query('SELECT * FROM employees');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getSingleEmployee($id)
    {
        $stmt = $this->db->prepare('SELECT * FROM employees WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $employee_code = trim($data['employee_code']);
        $first_name = trim($data['first_name']);
        $last_name = trim($data['last_name']);
        $email = trim($data['email']);
        $phone = trim($data['phone']);
        $gender = trim($data['gender']);
        $job_title = trim($data['job_title']);
        $salary = trim($data['salary']);
        $hire_date = trim($data['hire_date']);
        $status = trim($data['status']);

        $stmt = $this->db->prepare('INSERT INTO employees (employee_code, first_name, last_name, email, phone, gender, job_title, salary, hire_date, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

        $stmt->execute([$employee_code, $first_name, $last_name, $email, $phone, $gender, $job_title, $salary, $hire_date, $status]);

        return ['message' => 'New employee added'];

    }



}