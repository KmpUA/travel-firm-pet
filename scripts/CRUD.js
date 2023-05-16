const adminContainer = document.querySelector('.card-container');
const closeUpd = document.querySelector('.close');
const submitUpdate = document.querySelector('.submit-update');
const addNewCard = document.querySelector('.add-card');
let currTitle;


closeUpd.addEventListener('click', () => {
    document.querySelector('.update-form').style.display = 'none';
});

function changeFields(title = '', price = '', discount = '', region = '', image = '', description = '') {
    const fields = document.querySelectorAll('#email');
    fields[0].value = title;
    fields[1].value = price;
    fields[2].value = discount;
    fields[3].value = region;
    fields[4].value = image;
    fields[5].value = description;
}

function getObject() {
    const fields = document.querySelectorAll('#email');
    return {
        title: fields[0].value,
        price: parseInt(fields[1].value),
        discount: fields[2].value,
        region: fields[3].value,
        src: fields[4].value,
        description: fields[5].value
    };
}

addNewCard.addEventListener('click', () => {
    changeFields();
    submitUpdate.innerText = 'Додати';
    document.querySelector('.update-form').style.display = 'flex';
});

adminContainer.addEventListener('click', () => {
    const updateButtons = Array.from(document.querySelectorAll('.update-card'));
    const deleteButtons = Array.from(document.querySelectorAll('.delete-card'));

    deleteButtons.map(button => {
        button.addEventListener('click', (event) => {
            const currCard = event.target.parentElement.parentElement.parentElement;
            currTitle = currCard.querySelector('.card-title').innerText;
            const jsonBinUrl = "https://api.jsonbin.io/v3/b/645146669d312622a3562425";
            fetch(jsonBinUrl, {
                method: "GET",
                headers: {
                    "X-Master-Key": "$2b$10$gKlzs4ZJSWRw4VJj0Cb5COPyVt8eqwAMBk/piEtJFi3puIEl9mc4W"
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(currTitle);
                    const foundObject = data.record.find(obj => obj.title === currTitle);
                    if (foundObject) {
                        let temp = Array.from(data.record).indexOf(foundObject);
                        delete data.record[temp];
                        fetch(`${jsonBinUrl}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "X-Master-Key": "$2b$10$7Oe1WJbbDt1LCeFPeCjC6efIWFNBJAsRS1Z.dYiHcfGQn2MpQolJm"
                            },
                            body: JSON.stringify(data.record)
                        })
                            .then(response => response.json())
                            .catch(error => console.error(error));
                        alert('Успішно!');
                        document.querySelector('.update-form').style.display = 'none';
                    } else {
                        console.log("Object with title not found");
                    }
                })
                .catch(error => console.error(error));
        });
    });

    updateButtons.map(button => {
        button.addEventListener('click', (event) => {
            submitUpdate.innerText = 'Оновити';
            const currCard = event.target.parentElement.parentElement.parentElement;
            const updForm = document.querySelector('.update-form')
            updForm.style.display = 'flex';
            let discount;
            try {
                discount = parseInt(currCard.querySelector('.discount').innerText.replace('%', ''));
            } catch {
                discount = 0;
            }
            currTitle = currCard.querySelector('.card-title').innerText;
            changeFields(
                currCard.querySelector('.card-title').innerText,
                parseInt(currCard.querySelector('.product-price').innerText.replace('$', '')),
                discount,
                currCard.querySelector('.region').innerText,
                currCard.querySelector('.product-image').src,
                currCard.querySelector('#desc').innerText
            );
        });
    });
});

submitUpdate.addEventListener('click', () => {
    const jsonBinUrl = "https://api.jsonbin.io/v3/b/645146669d312622a3562425";
    const newData = getObject();

    fetch(jsonBinUrl, {
        method: "GET",
        headers: {
            "X-Master-Key": "$2b$10$gKlzs4ZJSWRw4VJj0Cb5COPyVt8eqwAMBk/piEtJFi3puIEl9mc4W"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (submitUpdate.innerText === 'Оновити') {
                const foundObject = data.record.find(obj => obj.title === currTitle);
                if (foundObject) {
                    let temp = Array.from(data.record).indexOf(foundObject);
                    Object.assign(data.record[temp], newData);
                    fetch(`${jsonBinUrl}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Master-Key": "$2b$10$7Oe1WJbbDt1LCeFPeCjC6efIWFNBJAsRS1Z.dYiHcfGQn2MpQolJm"
                        },
                        body: JSON.stringify(data.record)
                    })
                        .then(response => response.json())
                        .catch(error => console.error(error));
                    alert('Успішно!');
                    document.querySelector('.update-form').style.display = 'none';
                } else {
                    console.log("Object with title not found");
                }
            }
            else {
                data.record.push(newData);
                fetch(`${jsonBinUrl}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Master-Key": "$2b$10$7Oe1WJbbDt1LCeFPeCjC6efIWFNBJAsRS1Z.dYiHcfGQn2MpQolJm"
                    },
                    body: JSON.stringify(data.record)
                })
                    .then(response => response.json())
                    .catch(error => console.error(error));
                alert('Успішно!');
                document.querySelector('.update-form').style.display = 'none';
            }
        })
        .catch(error => console.error(error));
});
