const deleteButton = document.querySelectorAll('.del')
const listItem = document.querySelectorAll('span.incompleted')
const completedItem = document.querySelectorAll('span.completed')

Array.from(deleteButton).forEach((el)=> {
    el.addEventListener('click', deleteItem)
})

Array.from(listItem).forEach((el) => {
    el.addEventListener('click', markComplete)
})

Array.from(completedItem).forEach((el) => {
    el.addEventListener('click', markIncomplete)
})

async function deleteItem (){
    const itemID = this.parentNode.parentNode.childNodes[1].dataset.id
    console.log(itemID)
    try {
        const response = await fetch('list/deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemID': itemID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.error(err)
    }
}


async function markComplete () {
    const itemID = this.parentNode.parentNode.childNodes[1].dataset.id
    console.log(itemID)
    try {
        const response = await fetch('list/markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemID': itemID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.error(err)
    }
}


async function markIncomplete () {
    const itemID = this.parentNode.parentNode.childNodes[1].dataset.id
    console.log(itemID)
    try {
        const response = await fetch('list/markIncomplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemID': itemID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.error(err)
    }
}