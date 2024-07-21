
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyARoumL2e85JzTtz9uhxRCaVDDb2mgzbGQ",
    authDomain: "first-project-cc18b.firebaseapp.com",
    projectId: "first-project-cc18b",
    storageBucket: "first-project-cc18b.appspot.com",
    messagingSenderId: "770785505812",
    appId: "1:770785505812:web:cd9aa86b5761327af16d01",
    measurementId: "G-WC0ZSCJ5ES"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const todosCollection = collection(db, "todos");

const todo_input = document.getElementById("todo_input");
const add_Todo = document.getElementById("add_Todo");
const todo_list = document.getElementById("todo_list");


document.addEventListener("DOMContentLoaded", async () => {
    await getTodosFromDb();
});


add_Todo.addEventListener("click", async () => {
    await addToDoToDb();
});

async function addToDoToDb() {
    try {
        let obj = {
            todo: todo_input.value,
            createdAt: new Date().toISOString(),
        };

        const docRef = await addDoc(todosCollection, obj);
        console.log(docRef);
        todo_input.value = "";
        await getTodosFromDb(); 
    } catch (error) {
        console.log(error);
    }
}

async function getTodosFromDb() {
    try {
        todo_list.innerHTML = ""; 

        const querySnapshot = await getDocs(todosCollection);
        querySnapshot.forEach((doc) => {
            const { todo, createdAt } = doc.data();
            var ele =
                `<li id=${doc.id}>
                    ${todo} - ${new Date(createdAt).toLocaleDateString()}
                    <button class="delete-btn" data-id="${doc.id}">Delete</button>
                    <button class="edit-btn" data-id="${doc.id}">Edit</button>
                </li>`;

            todo_list.innerHTML += ele;
        });

        attachDeleteListeners(); 
        attachEditListeners(); 
    } catch (error) {
        console.log(error);
    }
}

function attachDeleteListeners() {
    
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const docId = e.target.getAttribute('data-id');
            await deleteTodo(docId);
        });
    });
}

function attachEditListeners() {
    
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const docId = e.target.getAttribute('data-id');
            await editTodo(docId);
        });
    });
}

async function deleteTodo(docId) {
    try {
        const todoRef = doc(db, "todos", docId);
        await deleteDoc(todoRef);
        console.log("Todo deleted successfully!");
        await getTodosFromDb();
    } catch (error) {
        console.log(error);
    }
}

async function editTodo(docId) {
    try {
        const todoRef = doc(db, "todos", docId);
        const todoDoc = await getDoc(todoRef);
        const todo = todoDoc.data().todo;

        
        const newTodo = prompt("Edit todo:", todo);

        if (newTodo !== null) { 
            await updateDoc(todoRef, { todo: newTodo });
            console.log("Todo updated successfully!");
            await getTodosFromDb(); 
        }
    } catch (error) {
        console.log(error);
    }
}












