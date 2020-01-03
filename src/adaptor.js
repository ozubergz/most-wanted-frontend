const ROOT_API = 'http://localhost:3000'

class Adaptor {

    static fetchAllData() {
        return fetch(ROOT_API + "/criminals")
            .then(res => res.json())
    }

    static createUser(username) {
        return fetch(ROOT_API + "/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
        .then(res => res.json());
    }

    static createComment(data, content) {
        return fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: CURR_USER.id,
                criminal_id: data.id,
                content
            })
        })
        .then(res => res.json())
    }

    static  removeComment(id) {
        return fetch(`http://localhost:3000/comments/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
    }

}