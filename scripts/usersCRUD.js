const api_url = 'https://api.jsonbin.io/v3/b/6450e5158e4aa6225e94b580/latest';
const tableBody = document.getElementById("table-body");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");
const perPage = 10;
let currentPage = 1;

async function fetchData() {
    const response = await fetch(api_url);
    const data = await response.json();
    return data.record;
}

function renderTable(data) {
    let start = (currentPage - 1) * perPage;
    let end = start + perPage;
    let tableHtml = '';
    for (let i = start; i < end && i < data.users.length; i++) {
        let row = `
                    <tr>
                        <td>${data.users[i].name}</td>
                        <td>${data.users[i].password}</td>
                        <td>${data.users[i].email}</td>
                        <td>${data.users[i].role}</td>
                        <td>
                            <button onclick="editUser(${i})">Edit</button>
                            <button onclick="deleteUser(${i})">Delete</button>
                            </td>
                            </tr>`;
        tableHtml += row;
    }
    tableBody.innerHTML = tableHtml;
}
async function editUser(index) {
    const row = tableBody.rows[index];
    let name = row.cells[0].innerText;
    let password = row.cells[1].innerText;
    let email = row.cells[2].innerText;
    let role = row.cells[3].innerText;

    row.cells[0].innerHTML = `<input type="text" value="${name}"> `;
    row.cells[1].innerHTML = `<input type="password" value="${password}"> `;
    row.cells[2].innerHTML = `<input type="email" value="${email}"> `;
    row.cells[3].innerHTML = `<select>
                                        <option value="Admin" ${role == 'Admin' ? 'selected' : ''}>Admin</option>
                                        <option value="User" ${role == 'User' ? 'selected' : ''}>User</option>
                                    </select > `;
    row.cells[4].innerHTML = `
        <button onclick="saveUser(${index})" >Save</button >
            <button onclick="cancelEdit(${index}, '${name}', '${password}', '${email}', '${role}')">Cancel</button>
    `;
}

async function deleteUser(index) {
    const response = await fetch(api_url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            users: {
                [index]: null
            }
        })
    });
    const data = await response.json();
    fetchDataAndRenderTable();
}

async function saveUser(index) {
    const row = tableBody.rows[index];
    let name = row.cells[0].querySelector('input').value;
    let password = row.cells[1].querySelector('input').value;
    let email = row.cells[2].querySelector('input').value;
    let role = row.cells[3].querySelector('select').value;

    const response = await fetch(api_url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2b$10$7Oe1WJbbDt1LCeFPeCjC6efIWFNBJAsRS1Z.dYiHcfGQn2MpQolJm'
        },
        body: JSON.stringify({
            [index]: {
                name,
                password,
                email,
                role
            }
        })
    });
    const data = await response.json();
    fetchDataAndRenderTable();
}

async function cancelEdit(index, name, password, email, role) {
    const row = tableBody.rows[index];
    row.cells[0].innerHTML = name;
    row.cells[1].innerHTML = password;
    row.cells[2].innerHTML = email;
    row.cells[3].innerHTML = role;
    row.cells[4].innerHTML = `
        <button onclick="editUser(${index})">Edit</button >
            <button onclick="deleteUser(${index})">Delete</button>
    `;
}

async function fetchDataAndRenderTable() {
    const data = await fetchData();
    renderTable(data);
}

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchDataAndRenderTable();
    }
});

nextButton.addEventListener("click", () => {
    currentPage++;
    fetchDataAndRenderTable();
});

fetchDataAndRenderTable();