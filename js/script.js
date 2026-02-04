const apiUrl = "http://localhost/employee-mgnt-qpi/employee";

async function loadEmployees() {
  try {
    let response = await fetch(apiUrl);

    if (!response.ok) throw new Error("Could not fetch employees");

    let employees = await response.json();

    let table = document.getElementById("employeeTable");

    let rows = "";

    employees.forEach((emp) => {
      rows += `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.employee_code}</td>
            <td>${emp.first_name}</td>
            <td>${emp.last_name}</td>
            <td>${emp.email}</td>
            <td>${emp.job_title}</td>
            <td>${emp.salary}</td>

            <td>
                <a href="edit-employee.html?id=${emp.id}" 
                   class="btn btn-sm btn-warning">Edit</a>

                <button onclick="deleteEmployee(${emp.id})" 
                        class="btn btn-sm btn-danger">Delete</button>
            </td>
        </tr>
      `;
    });

    table.innerHTML = rows;
  } catch (error) {
    alert(error.message);
  }
}

async function deleteEmployee(id) {
  if (confirm("Delete this employee?")) {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    loadEmployees();
  }
}

// Create or add employee
document
  .getElementById("employeeForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    let data = {
      employee_code: document.getElementById("employee_code").value,
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      gender: document.getElementById("gender").value,
      job_title: document.getElementById("job_title").value,
      salary: document.getElementById("salary").value,
      hire_date: document.getElementById("hired_date").value,
      status: document.getElementById("status").value,
    };
    console.log(data);

    let response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    alert("Employee Added Successfully");
    window.location = "employee.html";
  });

if (document.getElementById("employeeTable")) {
  loadEmployees();
}

// Update employee function

// 1️⃣ Get the employee ID from URL
function getEmployeeIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// 2️⃣ Fetch employee data and populate the form
async function loadEmployee() {
  const id = getEmployeeIdFromUrl();

  if (!id) {
    alert("No employee ID provided!");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${id}`);

    if (!response.ok) throw new Error("Could not fetch employee");

    const emp = await response.json();

    // Populate form

    document.getElementById("first_name").value = emp.first_name;
    document.getElementById("last_name").value = emp.last_name;
    document.getElementById("email").value = emp.email;
    document.getElementById("phone").value = emp.phone;
    document.getElementById("job_title").value = emp.job_title ?? "";
    document.getElementById("salary").value = emp.salary ?? "";
  } catch (error) {
    alert(error.message);
  }
}

// 3️⃣ Update employee
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const id = (document.getElementById("employee_id").value =
        getEmployeeIdFromUrl());

      const data = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        job_title: document.getElementById("job_title").value,
        salary: document.getElementById("salary").value,
      };

      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          alert("Error: " + JSON.stringify(result));
          return;
        }

        alert("Employee Updated Successfully!");
        window.location = "employee.html";
      } catch (error) {
        alert("Error: " + error.message);
      }
    });

    // 4️⃣ Load employee on page load
    if (getEmployeeIdFromUrl()) {
      loadEmployee();
    }
  }
});
