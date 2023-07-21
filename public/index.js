

const input = document.getElementById("input")
const btn = document.getElementById("btn")

btn.addEventListener("click", () => {
    let val = input.value;
    callPost(val);
})


const name = prompt("Enter your name: ")


async function callPost(val) {
    const data = {
        name: name,
        title: val,
        isDone: false
    }
    const response = await fetch("http://localhost:8000/", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    callGet(name);
    if (response.status === 200)
        alert("Succesfully submited");
    else
        alert("Something went wrong");

}

async function callGet(val) {

    fetch("http://localhost:8000/?name=" + val).
        then(response => {
            if (response.status !== 200)
                throw new Error("Something went wrong")
            return response.json()
        }).
        then(todos => {
            const { data } = todos;
            const todoList = document.getElementById("list")
            todoList.textContent = "";
            data.forEach(element => {
                const newTodoelement = document.createElement("div");
                newTodoelement.classList.add("perElement");
                const pTag = document.createElement("p");
                const checkBox = document.createElement("input");
                checkBox.setAttribute('type', 'checkbox');
                checkBox.addEventListener('click', () => {
                    markTodo(element);
                })
                const button = document.createElement("button");
                button.addEventListener('click', () => {
                    deleteTodo(element);
                })
                button.innerText = "Delete"
                const firstDiv = document.createElement("div");
                const secondDiv = document.createElement("div");
                secondDiv.classList.add('secondDiv');
                pTag.innerText = element.title

                if (element.isDone) {
                    pTag.style.textDecoration = "line-through"
                    checkBox.checked = true
                }
                firstDiv.appendChild(pTag);
                secondDiv.appendChild(checkBox);
                secondDiv.appendChild(button);
                newTodoelement.appendChild(firstDiv);
                newTodoelement.appendChild(secondDiv);
                todoList.appendChild(newTodoelement);
            });
        }).catch(err)
    {
        alert(err)
    }
}


async function markTodo(val) {
    await fetch("http://localhost:8000/markTodo", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
    }).then((res) => {
        return res.json();
    }).then((res) => {
        alert(res.msg)
        callGet(name)
    }).catch((err) => {
        alert(err)
    })
}

async function deleteTodo(val) {
    await fetch("http://localhost:8000/", {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
    }).then((res) => {
        return res.json();
    }).then((res) => {
        alert(res.msg)
        callGet(name)
    }).catch((err) => {
        alert(err)
    })
}

callGet(name);